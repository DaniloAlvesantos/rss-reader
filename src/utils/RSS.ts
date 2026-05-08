import { XMLParser, XMLValidator } from "fast-xml-parser";
import { ZodType } from "zod";

class RSS {
  private parser = new XMLParser();
  private xmlValidator = XMLValidator;

  public validate(xml: string): boolean {
    const isValid = this.xmlValidator.validate(xml);
    if (!isValid) return false;

    return true;
  }

  public zParse<T>(xml: string, schema: ZodType<T>): T | null {
    const isValid = this.validate(xml);
    if (!isValid) return null;

    const json = this.parser.parse(xml);
    const result = schema.safeParse(json);

    if (!result.success) return null;

    return result.data;
  }

  public parse(xml: string) {
    const isValid = this.validate(xml);
    if (!isValid) return;

    const json = this.parser.parse(xml);
    return json;
  }

  public getLastPost(xml: string) {
    const json = this.parse(xml);
    if (!json) return null;

    if(!json.rss || !json.rss.channel) {
      return null;
    }

    return json.rss.channel.item;
  }

  public getEssentials(xml: string) {
    const json = this.parse(xml);
    if (!json) return null;

    if(!json.rss || !json.rss.channel) {
      return null;
    }

    try {
      return {
        title: json.rss.channel.title,
        url: json.rss.channel.link,
        logo: json.rss.channel.image?.url,
        description: json.rss.channel.description,
        lastGuid: json.rss.channel.item[0].guid,
        lastPost: json.rss.channel.item[0].pubDate
      }
    } catch(err) {
      console.error(err);
    }
  }
} 

export { RSS };

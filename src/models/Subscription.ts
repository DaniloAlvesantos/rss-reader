import { Validator } from "../utils/Validator";

class Subscription {
  private id!: string;
  private url!: string;
  private interval!: number;
  private lastGuid!: string;
  private lastPost!: string;

  constructor(
    id: string,
    url: string,
    interval: number,
    lastGuid: string,
    lastPost: string,
  ) {
    this.setId(id);
    this.setUrl(url);
    this.setInterval(interval);
    this.setLastGuid(lastGuid);
    this.setLastPost(lastPost);
  }

  public getId(): string {
    return this.id;
  }

  public getUrl(): string {
    return this.url;
  }

  public getInterval(): number {
    return this.interval;
  }

  public getLastGuid(): string {
    return this.lastGuid;
  }

  public getLastPost(): string {
    return this.lastPost;
  }

  public setId(id: string): void {
    if (this.id === null) {
      this.id = id;
    }
  }

  public setUrl(url: string): void {
    if (Validator.getInstance().url(url)) {
      this.url = url;
    }
  }

  public setInterval(interval: number): void {
    this.interval = interval;
  }

  public setLastGuid(lastGuid: string): void {
    this.lastGuid = lastGuid;
  }

  public setLastPost(lastPost: string): void {
    this.lastPost = lastPost;
  }

  public toString(): string {
    return `Subscription { id: ${this.id}, url: ${this.url}, interval: ${this.interval}, lastGuid: ${this.lastGuid}, lastPost: ${this.lastPost} }`;
  }

  public toJSON(): Object {
    return {
      id: this.id,
      url: this.url,
      interval: this.interval,
      lastGuid: this.lastGuid,
      lastPost: this.lastPost,
    };
  }
}

export { Subscription };

import { z } from "zod";

class Validator {
  private static instance: Validator;
  private static readonly emailSchema = z.email({ pattern: z.regexes.email });
  private static readonly nameSchema = z.string().trim().min(3).max(255);
  private static readonly urlSchema = z.url({ protocol: /^https?$/ });
  private static readonly dateTimeSchema = z.iso.datetime();

  private constructor() {
    if (Validator.instance === null) {
      Validator.instance = new Validator();
    }

    return Validator.instance;
  }

  public static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }
    return Validator.instance;
  }

  public email(email: string): boolean {
    return Validator.emailSchema.safeParse(email).success;
  }

  public name(name: string): boolean {
    return Validator.nameSchema.safeParse(name).success;
  }

  public url(url: string): boolean {
    return Validator.urlSchema.safeParse(url).success;
  }

  public datetime(datetime: string): boolean {
    return Validator.dateTimeSchema.safeParse(datetime).success;
  }
}

export { Validator };

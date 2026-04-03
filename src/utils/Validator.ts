import { z } from "zod";

class Validator {
  private static instance: Validator;

  public static readonly emailSchema = z.email({
    pattern: z.regexes.email,
    error: "Invalid email address",
  });

  public static readonly nameSchema = z
    .string()
    .trim()
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(255, { error: "Name must be less than 255 characters long" });

  public static readonly urlSchema = z.url({
    protocol: /^https?$/,
    error: "Invalid URL",
  });

  public static readonly dateTimeSchema = z.iso.datetime({
    error: "Invalid date time format",
  });

  public static readonly passwordSchema = z.string().min(8, {
    error: "Password must be at least 8 characters long",
  });

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

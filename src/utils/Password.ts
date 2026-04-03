import crypto from "node:crypto";

class Password {
  private static readonly crypto = crypto;

  public static hash(
    password: string,
  ): { hash: string; salts: string } {
    const salts = this.crypto.randomBytes(16).toString("hex");
    const hash = this.crypto.hash(password, salts, "base64").toString();

    return { hash, salts };
  }

  public static compare(
    password: string,
    hash: string,
    salts: string,
  ): boolean {
    const hashPassword = this.crypto.hash(password, salts, "base64").toString();

    return hashPassword === hash;
  }
}

export { Password };

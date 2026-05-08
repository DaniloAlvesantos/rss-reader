import crypto from "node:crypto";

class Password {
  private static readonly crypto = crypto;

  public static hash(password: string): { hash: string; salt: string } {
    const salt = this.crypto.randomBytes(16).toString("hex");

    const hash = this.crypto
      .scryptSync(password, salt, 64)
      .toString("hex");

    return { hash, salt };
  }

  public static compare(
    password: string,
    hash: string,
    salt: string,
  ): boolean {
    const hashToCompare = this.crypto
      .scryptSync(password, salt, 64)
      .toString("hex");

    return this.crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(hashToCompare, "hex")
    );
  }
}

export { Password };
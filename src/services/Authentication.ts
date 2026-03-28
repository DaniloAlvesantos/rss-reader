import jwt from "jsonwebtoken";

class Authentication {
  private static readonly secret: string = process.env.JWT_SECRET || "secret";
  private static readonly expires: number =
    Number(process.env.JWT_EXPIRES) ?? 3000;
  private static readonly alg: jwt.Algorithm = "HS256";

  public static generateToken(userId: string): string {
    const token = jwt.sign({ userId }, this.secret, {
      expiresIn: this.expires,
      algorithm: this.alg,
    });

    return token;
  }

  public static verifyToken(token: string): string | jwt.JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

export { Authentication };

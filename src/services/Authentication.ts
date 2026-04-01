import jwt from "jsonwebtoken";
import type { JsonWebTokenPayload } from "../types/jwt";
import type { StringValue } from "ms";

class Authentication {
  private static readonly secret: string = process.env.JWT_SECRET || "secret";
  private static readonly expires: StringValue =
    (process.env.JWT_EXPIRES as StringValue) ?? "1d";

  public static generateToken(userId: string): string {
    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: this.expires,
      algorithm: "HS256",
    });

    return token;
  }

  public static verifyToken(token: string): JsonWebTokenPayload | null {
    try {
      const cleanToken = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;
      const decoded = jwt.verify(cleanToken!, this.secret) as any;


      if (decoded && typeof decoded === "object" && "id" in decoded) {
        return { id: decoded.id };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export { Authentication };

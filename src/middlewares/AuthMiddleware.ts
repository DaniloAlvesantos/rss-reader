import type { NextFunction, Request, Response } from "express";
import { Authentication } from "../services/Authentication";
class AuthMiddleware {
  public static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        isError: true,
        message: "Missing Authorization Header",
        status: 401,
      });
    }
    try {
      const decoded = Authentication.verifyToken(token);
      
      if (!decoded) {
        return res.status(401).json({
          isError: true,
          message: "Invalid or expired token",
          status: 401,
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
}

export { AuthMiddleware };

import * as express from "express";
import type { JsonWebTokenPayload } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user: JsonWebTokenPayload;
    }
  }
}

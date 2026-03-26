import type { Request, Response } from "express";

export type DefaultControllerProps = {
  req: Request;
  res: Response;
};

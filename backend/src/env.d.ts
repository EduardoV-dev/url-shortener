import { NextFunction, Request, Response } from "express";

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production";
  }
}

declare global {
  type ControllerMethod<P = ParamsDictionary> = (
    req: Request<P>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

  interface ServiceResponse<T> {
    message: string;
    data: T | null;
  }

  interface APIResponse<T> extends ServiceResponse<T> {
    error: ServiceResponse<unknown> | null;
  }
}

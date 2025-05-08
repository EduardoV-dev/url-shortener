import { NextFunction, Request, Response } from "express";

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production";
  }
}

declare global {
  type ControllerMethod = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

  interface TypedRequest<B = unknown, P = unknown> extends Request {
    body: B;
    params: P;
  }

  interface APIResponse<T> {
    message: string;
    data: T | null;
  }

  interface TypedResponseBody<T, K> extends APIResponse<T> {
    error: APIResponse<K> | null;
  }

  interface TypedResponse<T = unknown, K = unknown> extends Response {
    json: (body: TypedResponseBody<T, K>) => this;
  }
}

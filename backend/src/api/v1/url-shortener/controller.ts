import { Request, Response } from "express";
import { Service } from "./services";
import { Url } from "@/generated/prisma";
import { HttpError } from "@/utils/http-error";

interface Controller {
  createUrl: ControllerMethod;
  getUrlByShortCode: ControllerMethod;
}

export class UrlShortenerController implements Controller {
  constructor(private service: Service) {}

  public createUrl = async (
    req: TypedRequest<{ url: string }>,
    res: TypedResponse<Url>,
  ) => {
    try {
      const { url } = req.body;
      const response = await this.service.createShortUrl(url);

      res.status(201).json({
        message: "Short url created succesfully!",
        data: response,
        error: null,
      });
    } catch (err) {
      const error = err as HttpError;
      console.log("error", error.details, error.message);

      res.status(400).json({
        message: "",
        error: { message: error.message, data: null },
        data: null,
      });
    }
  };

  public getUrlByShortCode = async (req: Request, res: Response) => {
    res.status(200).json({ message: "redirected to url" });
  };
}

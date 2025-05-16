import { Request, Response } from "express";
import { Service } from "./services";
import { Url } from "@/generated/prisma";
import { HttpError } from "@/utils/http-error";

interface Controller {
  createUrl: ControllerMethod;
  getUrlByShortCode: ControllerMethod;
}

type UrlResponse = APIResponse<Url>;

export class UrlShortenerController implements Controller {
  constructor(private service: Service) {}

  public createUrl: Controller["createUrl"] = async (
    req: Request<{}, {}, { url: string }>,
    res: Response<UrlResponse>,
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
      res.status(error.statusCode).json({
        data: null,
        error: { message: error.message, data: null },
        message: "",
      });
    }
  };

  public getUrlByShortCode: Controller["getUrlByShortCode"] = async (
    req: Request<{ shortCode: string }>,
    res: Response<UrlResponse>,
  ) => {
    try {
      const { shortCode } = req.params;
      const response = await this.service.getUrlByCode(shortCode);
      res.status(200).json({
        data: response,
        error: null,
        message: "Url retrieved succesfully!",
      });
    } catch (err) {
      const error = err as HttpError;
      console.log("error", error.details, error.message);
      res.status(error.statusCode).json({
        data: null,
        error: { message: error.message, data: error.details || null },
        message: "",
      });
    }
  };
}

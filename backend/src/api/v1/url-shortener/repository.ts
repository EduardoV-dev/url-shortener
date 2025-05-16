import { Url } from "@/generated/prisma";
import { prisma } from "@/storage/prisma";
import { HttpError } from "@/utils/http-error";

interface CreateParams {
  shortCode: string;
  originalUrl: string;
}

export interface Repository {
  create: (params: CreateParams) => Promise<Url>;
  getByCode: (code: string) => Promise<Url | null>;
  updateByCode: (code: string, data: Partial<Url>) => Promise<Url>;
}

export class UrlShortenerRepository implements Repository {
  public create: Repository["create"] = async (params) => {
    try {
      return await prisma.url.create({
        data: params,
      });
    } catch (err) {
      throw new HttpError("Could not create the short url", 500, err);
    }
  };

  public getByCode: Repository["getByCode"] = async (code) => {
    try {
      const url: Url | null = await prisma.url.findFirst({
        where: { shortCode: code },
      });
      return url;
    } catch (err) {
      throw new HttpError("Could not retrieve original url", 500, err);
    }
  };

  public updateByCode: Repository["updateByCode"] = async (code, data) => {
    try {
      return await prisma.url.update({
        where: {
          shortCode: code,
        },
        data,
      });
    } catch (err) {
      throw new HttpError("Could not update click count", 500, err);
    }
  };
}

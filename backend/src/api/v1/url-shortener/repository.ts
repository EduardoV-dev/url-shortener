import { Url } from "@/generated/prisma";
import { prisma } from "@/storage/prisma";
import { HttpError } from "@/utils/http-error";

interface CreateParams {
  shortCode: string;
  originalUrl: string;
}

export interface Repository {
  create: (params: CreateParams) => Promise<Url>;
  getByShortCode: (code: string) => void;
}

export class UrlShortenerRepository implements Repository {
  public create = async (params: CreateParams): Promise<Url> => {
    try {
      return await prisma.url.create({
        data: params,
      });
    } catch (err) {
      console.log("error", err);
      throw new HttpError("Could not create the short url", 500, err);
    }
  };

  public getByShortCode: (code: string) => void = () => {};
}

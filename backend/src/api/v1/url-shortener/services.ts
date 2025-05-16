import { nanoid } from "nanoid";
import { Repository } from "./repository";
import { Url } from "@/generated/prisma";
import { HttpError } from "@/utils/http-error";

export interface Service {
  createShortUrl: (url: string) => Promise<Url>;
  getUrlByCode: (code: string) => Promise<Url>;
}

export class UrlShortenerService implements Service {
  constructor(private repository: Repository) {}

  private generateIntByRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  public createShortUrl: Service["createShortUrl"] = (url) => {
    const codeLength: number = this.generateIntByRange(6, 10);
    const shortCode: string = nanoid(codeLength);

    return this.repository.create({ shortCode, originalUrl: url });
  };

  public getUrlByCode: Service["createShortUrl"] = async (code) => {
    const url = await this.repository.getByCode(code);
    if (!url) throw new HttpError("Url not found", 404);

    return this.repository.updateByCode(code, {
      clickCount: url.clickCount + 1,
    });
  };
}

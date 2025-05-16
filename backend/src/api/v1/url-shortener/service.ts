import { nanoid } from "nanoid";
import { Repository } from "./repository";
import { Url } from "@/generated/prisma";
import { HttpError } from "@/utils/http-error";
import { CodeGenerator } from "./utils";

export interface Service { createShortUrl: (url: string) => Promise<Url>;
  getUrlByCode: (code: string) => Promise<Url>;
}

export class UrlShortenerService implements Service {
  constructor(private repository: Repository, private codeGenerator: CodeGenerator) { }

  public createShortUrl: Service["createShortUrl"] = (url) => {
    const shortCode: string = this.codeGenerator.generateByRange(6, 10);
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


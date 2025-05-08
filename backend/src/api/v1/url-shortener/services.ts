import { nanoid } from "nanoid";
import { Repository } from "./repository";
import { Url } from "@/generated/prisma";

export interface Service {
  createShortUrl: (url: string) => Promise<Url>;
}

export class UrlShortenerService implements Service {
  constructor(private repository: Repository) {}

  private generateIntByRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  public createShortUrl = (url: string): Promise<Url> => {
    const codeLength: number = this.generateIntByRange(6, 10); 
    const shortCode: string = nanoid(codeLength);

    return this.repository.create({ shortCode, originalUrl: url });
  };
}

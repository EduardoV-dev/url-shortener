import { Router } from "express";
import { UrlShortenerController } from "./controller";
import { validateRequest } from "@/middlewares/validator";
import { urlSchema } from "./validations";
import { UrlShortenerRepository } from "./repository";
import { ShortCodeGenerator, UrlShortenerService } from "./service";

const repo = new UrlShortenerRepository();
const shortCodeGenerator = new ShortCodeGenerator();
const service = new UrlShortenerService(repo, shortCodeGenerator);
const controller = new UrlShortenerController(service);

const router = Router();

router
  .get("/:shortCode", controller.getUrlByShortCode)
  .post("", validateRequest(urlSchema), controller.createUrl);

export default router;

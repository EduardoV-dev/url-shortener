import { Router } from "express";
import { UrlShortenerController } from "./controller";
import { validateRequest } from "@/utils/validations";
import { urlSchema } from "./validations";
import { UrlShortenerRepository } from "./repository";
import { UrlShortenerService } from "./services";

const repo = new UrlShortenerRepository();
const service = new UrlShortenerService(repo);
const controller = new UrlShortenerController(service);

const router = Router();

router
  .get("/:shortCode", controller.getUrlByShortCode)
  .post("", validateRequest(urlSchema), controller.createUrl);

export default router;

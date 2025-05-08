import { Router } from "express";

import urlShortenerRoutes from "./url-shortener/routes";

const serverRouter = Router();

serverRouter.use("/shorten-url", urlShortenerRoutes);

export default serverRouter;

import "module-alias/register";
import express, { Response } from "express";
import serverRouter from "./api/v1";
import { ENVS } from "./config/env";

const app = express();

app.use(express.json());
app.use("/api/v1", serverRouter);

app.get("/", (_, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(ENVS.PORT, () => console.log(`Server running on port ${ENVS.PORT}`));

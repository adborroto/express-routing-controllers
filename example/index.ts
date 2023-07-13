import express, { Request, Response } from "express";
import { registerControllers } from "../index";
import { UserController } from "./user.controller";
const app = express();
const port = 3000;

// const router = express.Router();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

registerControllers(app, [UserController], {
  debug: true,
  vars: { version: "v1" },
});
// app.use("/test", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

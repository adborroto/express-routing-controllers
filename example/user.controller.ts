import { Get, Post, Body, Params, Route } from "../index";
import { GetUser, CreateUser } from "./user.dto";
import { Request, Response } from "express";

@Route("api/:version/users")
export class UserController {
  constructor() {}

  @Get("/")
  getUsers(req: Request, res: Response) {
    res.send("All users");
  }

  @Get("/:id")
  getUser(@Params() params: GetUser, req: Request, res: Response) {
    res.send(`Hello user ${params.id}!`);
  }

  @Post("/")
  createUser(@Body() createUser: CreateUser, req: Request, res: Response) {
    res.send(`User created: ${createUser.name}`);
  }
}

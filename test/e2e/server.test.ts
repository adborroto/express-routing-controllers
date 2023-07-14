import request from "supertest";
import express from "express";
import { registerControllers } from "../../index";
import { Route, Get } from "../../src/decorators";
import "reflect-metadata";

@Route("/test")
class TestController {
  @Get("/get")
  public static getTest(req: express.Request, res: express.Response) {
    res.send("Hello!");
  }
}

function buildRequest() {
  const app = express();
  registerControllers(app, [TestController]);
  return request(app);
}

describe("controller", () => {
  let server: any = null;
  beforeAll(() => {
    server = buildRequest();
  });
  describe("Get", () => {
    it("should return 200", () => {
      server.get("/test/get").expect(200);
    });
  });
});

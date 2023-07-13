# Express controllers

Express Controllers is an npm package that simplifies the process of extending the Express framework by providing a decorator-based approach for defining and organizing your routes using controllers.

With this package, you can easily structure and manage your API endpoints in a more modular and maintainable way.

# Installation

To install express-routing-controllers, you can use npm or yarn:

```shell
npm install express-routing-controllers
```

or

```shell
yarn add express-routing-controllers
```

# Usage

Here's an example of how to use Express Controllers in your express application:

```javascript
const express = require("express");
const {
  registerControllers,
  Route,
  Get,
  Post,
  Params,
  Body,
} = require("express-routing-controllers");

const app = express();
const port = process.env.PORT || 3000;

@Route("api/:version/users")
export class UserController {
  @Get("/")
  getUsers(req, res) {
    res.send("All users");
  }

  @Get("/:id")
  getUser(@Params() params, req, res) {
    res.send("Hello user " + params.id);
  }

  @Post("/")
  createUser(@Body() createUser, req, res) {
    res.send("User created" + createUser.name);
  }
}

app.use(express.json());

registerControllers(app, [UserController], {
  debug: true,
  vars: { version: "v1" },
});

app.listen(port, () => {
  console.log("⚡️[server]: Server is running at http://localhost:300");
});
```

# Decorators

express-routing-controllers provides the following decorators for defining routes:

## Routes

- @Route(path: string): Specifies the base path for all routes defined within the controller.
- @Get(path: string): Defines a GET route with the specified path.
- @Post(path: string): Defines a POST route with the specified path.
- @Delete(path: string): Defines a DELETE route with the specified path.
- @Put(path: string): Defines a PUT route with the specified path.

## Arguments

- @Params(): Injects route parameters into the controller method.
- @Body(): Injects the request body into the controller method.
- @Query(): Injects the query into the controller method.

## API Reference

`registerControllers(app, controllers, options?)` Registers the controllers with the Express application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

Express Controllers is MIT licensed.

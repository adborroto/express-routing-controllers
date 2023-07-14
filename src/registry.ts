import { Express, Request, Response, Router, NextFunction } from "express";
import {
  RouterDefinition,
  FromParamDefinition,
  Options,
  Method,
} from "./types";

export function registerControllers(
  router: Express | Router,
  controllers: [new () => any],
  options?: Options | undefined
) {
  controllers.forEach((controller) => {
    if (options && options.debug)
      console.log(`🚀[controller]: ${controller.name}`);
    registerController(router, controller, options);
  });
}

function registerController(
  router: Express | Router,
  controller: any,
  options?: Options
) {
  const instance = new controller();
  const routes: [RouterDefinition] = instance.__routes__ || [];
  const routePrefix = getRoutePrefix(controller, options);
  routes.forEach((route: RouterDefinition) => {
    registerRoute(instance, router, route, routePrefix, options);
  });
}

function registerRoute(
  instance: any,
  router: any,
  route: RouterDefinition,
  routePrefix: string,
  options?: Options
) {
  const path = buildPath(routePrefix, route.path, options);
  logRoute(route.method, path, options);

  router[route.method](
    path,
    (req: Request, res: Response, next: NextFunction) => {
      const params = instance.__from__[route.methodName] || {};
      let request = () => instance[route.methodName](req, res, next);
      let a0: any, a1: any, a2: any;
      if (params[0]) {
        const param: FromParamDefinition = params[0] as FromParamDefinition;
        a0 = (req as any)[param.from];
        request = () => instance[route.methodName](a0, req, res, next);
      }
      if (params[1]) {
        a1 = (req as any)[params[1].from];
        request = () => instance[route.methodName](a0, a1, req, res, next);
      }
      if (params[2]) {
        a2 = (req as any)[params[2].from];
        request = () => instance[route.methodName](a0, a1, a2, req, res, next);
      }
      return request();
    }
  );
}

function buildPath(
  routePrefix: string,
  path: string,
  options?: Options
): string {
  replaceVars(path, options);
  if (options && options.disablePrefix) return path;
  return routePrefix + path;
}

function getRoutePrefix(target: any, options?: Options): string {
  let prefix = target.__routePrefix__ || "/";
  prefix = prefix.startsWith("/") ? prefix : "/" + prefix;
  return replaceVars(prefix, options);
}

function replaceVars(path: string, options?: Options): string {
  if (!options || !options.vars) return path;
  let result = path;
  const vars = options!.vars;
  Object.keys(vars).forEach((key) => {
    result = result.replace(`:${key}`, vars[key]);
  });
  return result;
}

function logRoute(method: Method, path: string, options?: Options): void {
  if (!options || !options.debug) return;
  console.info(`  [${method.toUpperCase()}] ${path}`);
}

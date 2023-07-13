import "reflect-metadata";
import { RouterDefinition, FromParamDefinition } from "./types";

export function Route(prefix: string): ClassDecorator {
  return function(target: any) {
    target.__routePrefix__ = prefix || "/";
  };
}

export function Get(path: string = "") {
  return routeDecorator("get", path);
}

export function Post(path: string = "") {
  return routeDecorator("post", path);
}

export function Delete(path: string = "") {
  return routeDecorator("delete", path);
}

export function Patch(path: string = "") {
  return routeDecorator("patch", path);
}

export function Put(path: string = "") {
  return routeDecorator("put", path);
}

export function Head(path: string = "") {
  return routeDecorator("head", path);
}

export function Options(path: string = "") {
  return routeDecorator("options", path);
}

export function Method(method: string, path: string = "") {
  if (!method) throw new Error("Method is required.");
  return routeDecorator(method, path);
}

export function Params() {
  return fromDecorator("params");
}

export function Body() {
  return fromDecorator("body");
}

export function Query() {
  return fromDecorator("query");
}

function fromDecorator(from: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const paramTypes = Reflect.getMetadata(
      "design:paramtypes",
      target,
      propertyKey
    );
    target.__from__ = target.__from__ || {};
    target.__from__[propertyKey] = target.__from__[propertyKey] || {};
    target.__from__[propertyKey][parameterIndex] = {
      parameterIndex,
      propertyKey,
      from,
      schema: paramTypes[parameterIndex],
    } as FromParamDefinition;
  };
}

function routeDecorator(method: string, path: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    target.__routes__ = target.__routes__ || [];
    target.__routes__.push({
      method,
      path,
      originalFn: descriptor.value,
      methodName: propertyKey,
    } as RouterDefinition);
  };
}

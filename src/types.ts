export type RouterDefinition = {
  method: Method;
  path: string;
  originalFn: () => any;
  methodName: string;
};

export type FromParamDefinition = {
  parameterIndex: number;
  propertyKey: string;
  from: string;
  schema: any;
};

export type Options = {
  debug?: boolean;
  disablePrefix?: boolean;
  vars?: Record<string, any>;
};

export type Method = "get" | "post" | "put" | "delete" | "patch" | "options";

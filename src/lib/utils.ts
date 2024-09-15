import { ZodIssue } from "zod";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ErrorObject } from "../types/zodTypes";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toErrorObject = (errors: ZodIssue[]): ErrorObject => {
  return errors.reduce((acc: ErrorObject, err: ZodIssue) => {
    if (err.path.length > 0) {
      acc[err.path[0] as string] = err.message;
    }
    return acc;
  }, {});
};

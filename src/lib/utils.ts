import { ZodIssue } from "zod";
import { ErrorObject } from "../types/zodTypes";

export const toErrorObject = (errors: ZodIssue[]): ErrorObject => {
  return errors.reduce((acc: ErrorObject, err: ZodIssue) => {
    if (err.path.length > 0) {
      acc[err.path[0] as string] = err.message;
    }
    return acc;
  }, {});
};

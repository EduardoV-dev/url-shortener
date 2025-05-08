import { Request, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

type ValidationErrors = { [x in string]: string };

const groupErrors = (errors: ZodError): ValidationErrors => {
  const { fieldErrors } = errors.flatten();

  return Object.keys(fieldErrors).reduce<ValidationErrors>((errs, field) => {
    const errorMessages = fieldErrors[field];
    if (errorMessages === undefined) return { ...errs };

    return {
      ...errs,
      [field]: errorMessages.length > 0 ? errorMessages[0] : "",
    };
  }, {});
};

export const validateRequest =
  (schema: AnyZodObject) =>
  async (
    req: Request,
    res: TypedResponse<unknown, ValidationErrors>,
    next: NextFunction,
  ) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      res.status(400).json({
        message: "",
        data: null,
        error: {
          message: "Validation failed",
          data: groupErrors(err as ZodError),
        },
      });
    }
  };

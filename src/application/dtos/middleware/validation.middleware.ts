import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validateInput =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (e) {
      console.log(e);
      return res.json({ messsage: "User cannot be validated" });
    }
  };

export default validateInput;

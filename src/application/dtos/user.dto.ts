import { z } from "zod";

export const userSchemaZod = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .nonempty(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .nonempty()
    .email("Invalid Email"),
  password: z
    .string({
      required_error: "Password must be provided",
    })
    .nonempty()
    .min(5)
    .nonempty(),
  phone: z
    .number({
      required_error: "Phone number must be provided",
    })
    .min(9),
  address: z
    .string({
      required_error: "Address must be provided",
    })
    .nonempty(),
});

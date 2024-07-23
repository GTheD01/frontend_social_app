import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const RegisterUserSchema = z
  .object({
    email: z.string().email("Invalid email"),
    first_name: z
      .string()
      .min(2, "First Name must be longet than 2 characters"),
    last_name: z.string().min(2, "Last name must be longer than 2 characters"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    re_password: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine(
    (values) => {
      return values.password === values.re_password;
    },
    {
      message: "Passwords must match!",
      path: ["re_password"],
    }
  );

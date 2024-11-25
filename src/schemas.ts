import { z } from "zod";

// USER VALIDATION SCHEMAS

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const RegisterUserSchema = z
  .object({
    email: z.string().email("Invalid email"),
    full_name: z.string().min(5, "Full Name must be longer than 5 characters"),
    username: z.string().min(2, "Username must be longer than 2 characters"),
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

export const ResetPasswordUserSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const ResetPasswordConfirmSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
    re_new_password: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine(
    (values) => {
      return values.new_password === values.re_new_password;
    },
    {
      message: "Passwords must match!",
      path: ["re_new_password"],
    }
  );

// POSTS VALIDATION SCHEMAS

export const PostSchema = z.object({
  body: z.string().min(1, "Body text required"),
});

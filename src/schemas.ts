import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const RegisterUserSchema = z.object({
  email: z.string().email("Invalid email"),
  fullName: z.string().min(5, "Full Name should be longer"),
  username: z.string().min(3, "Username must be longer than 3 characters"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

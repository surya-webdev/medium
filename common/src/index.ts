import { ParseStatus, z } from "zod";

export const userSignup = z.object({
  email: z.string(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const userSignin = z.object({
  email: z.string(),
  password: z.string(),
});

export const blogInputs = z.object({
  title: z.string(),
  content: z.string(),
});

export type UserSignin = z.infer<typeof userSignin>;
export type UserSignup = z.infer<typeof userSignup>;
export type BlogInputs = z.infer<typeof blogInputs>;

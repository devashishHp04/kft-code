import * as z from "zod";

// schema for login form
export const formSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase()),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

// create account schema
export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters long"),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email address")
      .transform((val) => val.toLowerCase()),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

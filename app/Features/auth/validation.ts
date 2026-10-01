import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        error: (issue) =>
          (issue.input === undefined ? "Name is required" : undefined),
      })
      .min(2, "Name must be at least 2 characters"),
    email: z.email({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Enter a valid email",
    }),
    password: z
      .string({
        error: (issue) =>
          (issue.input === undefined ? "Password is required" : undefined),
      })
      .min(8, "password must be at least 8 characters"),
    confirmPassword: z.string({
        error: (issue) => 
        issue.input === undefined ? "Please confirm your password" : undefined,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
    email: z.email({
        error: (issue) => issue.input === undefined ? "Email is required" : "Enter a valid email",
    }),
    password: z.string({
        error: (issue) => (issue.input === undefined ? "Password is required" : undefined),
    }).min(1, "please enter the correct password"),
});
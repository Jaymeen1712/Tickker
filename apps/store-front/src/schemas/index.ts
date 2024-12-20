import { z } from "zod";

export const SignUpFormSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const ProductFilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  strap: z.string().optional(),
  buckle: z.string().optional(),
  strapSize: z.string().optional(),
  movement: z.string().optional(),
  waterResistance: z.string().optional(),
  caseMaterial: z.string().optional(),
});

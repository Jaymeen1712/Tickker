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

export const AddUpdateProductSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  model: z.string().min(1),
  description: z.string().min(1, { message: "Required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  images: z.string().optional(),
  stock: z
    .number()
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock cannot be less than 0" }),
  isVisible: z.boolean().optional(),

  // Watch-specific attributes
  category: z.string().min(1, { message: "Required" }),
  brand: z.string().min(1, { message: "Required" }),
  strap: z.string().min(1),
  buckle: z.string().min(1),
  strapSize: z.string().min(1),
  movement: z.string().min(1),
  waterResistance: z.string().min(1),
  caseMaterial: z.string().min(1),
  caseDiameter: z.string().min(1),
  dialColor: z.string().min(1),
});

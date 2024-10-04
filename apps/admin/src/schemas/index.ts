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
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "Price must be a positive number" }),
  images: z.string().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  brand: z.string().optional(),
  stock: z
    .number()
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock cannot be less than 0" }),
  isVisible: z.boolean().optional(),
});

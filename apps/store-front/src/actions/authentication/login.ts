"use server";

import { signIn } from "@/auth";
import {
  AuthError,
  LoginFormSchema,
  type LoginFormType,
} from "@repo/shared-auth";

export const loginAction = async (values: LoginFormType) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Wrong email or password" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return {
    success: "User is successfully Logged in.",
  };
};

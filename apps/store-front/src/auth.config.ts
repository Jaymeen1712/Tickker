import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { LoginFormSchema } from "./schemas";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null; // Validation failed
        }

        const { password, email } = validatedFields.data;
        const user = await db.user.findFirst({
          where: {
            OR: [{ email }],
          },
        });

        if (!user) {
          // User not found
          return null;
        }

        if (user.password) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            // Password does not match
            return null;
          }
        }

        // Convert user ID to string if it's a number
        return {
          ...user,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

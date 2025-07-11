import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginFormSchema } from "./schemas.js";

// Import db dynamically to avoid circular dependencies
async function getDb() {
  try {
    const { db } = await import("@repo/database");
    return db;
  } catch (error) {
    console.error("Failed to import database:", error);
    return null;
  }
}

export const createAuthConfig = (isAdmin: boolean = false): NextAuthConfig => ({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null; // Validation failed
        }

        const { password, email } = validatedFields.data;

        const db = await getDb();
        if (!db) {
          console.error("Database not available");
          return null;
        }

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

          // Check admin role if required
          if (isAdmin) {
            const { roles } = user;
            if (!roles.includes("ADMIN")) {
              // User is not admin
              return null;
            }
          }
        }

        // Convert user ID to string if it's a number
        return {
          ...user,
        };
      },
    }),
  ],
});

export const defaultCallbacks = {
  async session({ session, token }: { session: any; token: any }) {
    if (session.user && token.sub) {
      session.user.id = token.sub;
    }
    return session;
  },
  async jwt({ token }: { token: any }) {
    return token;
  },
  async signIn({ user }: { user: any }) {
    return true;
  },
};

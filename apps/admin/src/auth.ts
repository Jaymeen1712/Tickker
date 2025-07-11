import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { defaultCallbacks } from "@repo/shared-auth";
import NextAuth from "next-auth";
import { db } from "./db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: defaultCallbacks,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

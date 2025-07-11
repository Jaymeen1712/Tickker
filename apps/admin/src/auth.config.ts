import { createAuthConfig } from "@repo/shared-auth/config";
import type { NextAuthConfig } from "next-auth";

export default createAuthConfig(true) satisfies NextAuthConfig;

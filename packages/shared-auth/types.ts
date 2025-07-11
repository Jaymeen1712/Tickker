import { User, Profile } from "@prisma/client";

export interface ExtendedUser extends User {
  profile?: Profile;
}

export interface AuthResponse {
  success?: string;
  error?: string;
}

export interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  roles?: string[];
}

export interface AuthCallbacks {
  session?: (params: { session: any; token: any }) => Promise<any>;
  jwt?: (params: { token: any; user?: any }) => Promise<any>;
  signIn?: (params: { user: any; account?: any; profile?: any }) => Promise<boolean>;
}

export interface AuthConfig {
  providers: any[];
  callbacks?: AuthCallbacks;
  adapter?: any;
  session?: {
    strategy: "jwt" | "database";
  };
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
  };
}

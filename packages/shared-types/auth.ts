import type { User, Profile } from "@prisma/client";

// Extended user types
export interface ExtendedUser extends User {
  profile?: Profile | null;
}

// Session types
export interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  roles: string[];
}

export interface ExtendedSession {
  user: SessionUser;
  expires: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface NewPasswordRequest {
  password: string;
  token: string;
}

// Role and permission types
export type UserRole = "ADMIN" | "STANDARD";

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// OAuth types
export interface OAuthProvider {
  id: string;
  name: string;
  type: string;
  clientId: string;
  clientSecret: string;
  issuer?: string;
  wellKnown?: string;
}

export interface OAuthAccount {
  provider: string;
  providerAccountId: string;
  type: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
}

// JWT types
export interface JWTPayload {
  sub: string;
  email?: string;
  name?: string;
  roles: string[];
  iat: number;
  exp: number;
}

// Authentication response types
export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: SessionUser;
  redirectTo?: string;
}

// Two-factor authentication types
export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerification {
  token: string;
  backupCode?: string;
}

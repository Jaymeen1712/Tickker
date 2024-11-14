"use client";
import { useProfile } from "@/hooks";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useProfile();

  return <div>{children}</div>;
}

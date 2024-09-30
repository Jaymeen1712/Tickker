"use client";
import { Header } from "@/components";
import { useProfile } from "@/hooks";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useProfile();

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

"use client";
import { Header } from "@/components";
import { useProfile } from "@/hooks";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useProfile();

  return (
    <div className="flex min-h-screen flex-col bg-black-primary">
      <Header />
      {children}
    </div>
  );
}

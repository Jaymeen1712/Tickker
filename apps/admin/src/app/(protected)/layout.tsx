"use client";
import { Header } from "@/components";
import { useProfile } from "@/hooks";
import { useSession } from "next-auth/react";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useProfile();
  const session = useSession();

  return (
    <div>
      <Header />
      <div className="my-4 flex w-full justify-center space-x-4">
        <span>{session.data?.user?.name}</span>
        <span>{session.data?.user?.email}</span>
      </div>
      {children}
    </div>
  );
}

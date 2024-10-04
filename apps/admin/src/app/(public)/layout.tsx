"use client";
import { useSession } from "next-auth/react";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  
  return (
    <div>
      <div className="my-4 flex w-full justify-center space-x-4">
        <span>{session.data?.user?.name}</span>
        <span>{session.data?.user?.email}</span>
      </div>
      {children}
    </div>
  );
}

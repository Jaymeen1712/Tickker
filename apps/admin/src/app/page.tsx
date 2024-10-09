"use client";
import { Header } from "@/components";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();

  return (
    <div className="relative h-[5000px]">
      <Header />
      <div className="my-4 flex w-full justify-center space-x-4">
        <span>{session.data?.user?.name}</span>
        <span>{session.data?.user?.email}</span>
      </div>
    </div>
  );
}

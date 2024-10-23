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
    <div className="flex h-screen">
      <Header />
      {/* Add gradient below bg-gradient-to-b from-transparent from-90% to-gray-400/50  */}
      <div className="hide-scrollbar shadow-l m-4 flex w-full flex-col overflow-auto rounded-3xl border-transparent bg-[#F7F7F7] p-4">
        {children}
      </div>
    </div>
  );
}

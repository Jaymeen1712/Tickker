import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Toaster } from "sonner";
import "./globals.css";
import Provider from "./provider";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tickker",
  description: "Tickker - Ecommerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="min-h-screen bg-black-primary">{children}</div>
        </Provider>
      </body>
      <Toaster />
    </html>
  );
}

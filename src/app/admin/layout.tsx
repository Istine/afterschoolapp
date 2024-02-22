"use client";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="uft-8" />
        <title>Admin Smb</title>
      </head>
      <body className={` bg-[#f0efed]`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

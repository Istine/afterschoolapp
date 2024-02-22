"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5">
      <div>
        <div className="w-full h-[15em] rounded-lg bg-slate-500 p-4 flex items-center">
          <h1 className="text-white font-bold text-3xl">Profile</h1>
        </div>
      </div>
      {children}
    </div>
  );
}

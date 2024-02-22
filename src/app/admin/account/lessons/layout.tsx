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
        <div className="w-full h-[15em] rounded-lg bg-[url('https://assets.website-files.com/6057ab51530cb39d3fdac75d/6060a6443975b01881b8b0f2_User%20Banner-min.jpg')] bg-cover bg-no-repeat"></div>
      </div>
      {children}
    </div>
  );
}

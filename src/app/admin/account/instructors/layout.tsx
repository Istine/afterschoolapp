"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="p-5">
        <div className="w-full h-[15em] rounded-lg bg-[url('https://assets.website-files.com/6057ab51530cb39d3fdac75d/60ad16300e1d6343d2ef0454_Banner%20Team-min.jpg')] bg-cover bg-no-repeat"></div>
      </div>
      {children}
    </div>
  );
}

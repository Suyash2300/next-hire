import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "NextHire - Mini Job Board",
  description:
    "A modern full-stack job board built with Next.js, Server Actions, and Tailwind CSS.",
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Casebook",
  description: "Tool enabling caseworkers to keep track of their tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-screen w-screen flex flex-col overflow-x-hidden">
          <header className="flex justify-between">
            <Navbar />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

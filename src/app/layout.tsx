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
        <body className="h-screen w-screen flex flex-col items-center overflow-x-hidden bg-white">
          <header className="bg-govblack text-white w-full flex justify-center">
            <Navbar />
          </header>
          <div className="h-full w-5/6 border-t-16 border-govblue pt-6 items-center">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

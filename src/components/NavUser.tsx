"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Renders the sign in and sign out links if user is logged out, otherwise renders their profile button
export default function NavUser() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          className="hover:underline hover:underline-offset-6 hover:decoration-1 hover:cursor-pointer"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="hover:underline hover:underline-offset-6 hover:decoration-1 hover:cursor-pointer"
        >
          Sign Up
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

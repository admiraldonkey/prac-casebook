"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function NavUser() {
  return (
    <>
      <SignedOut>
        {/* <Link href="/sign-in"> */}
        {/* <SignInButton /> */}
        <Link
          href="/sign-in"
          className="hover:text-amber-200 hover:cursor-pointer"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="hover:text-amber-200 hover:cursor-pointer"
        >
          Sign Up
        </Link>
        {/* <SignUpButton /> */}
        {/* </Link> */}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

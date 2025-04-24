import Link from "next/link";
import NavUser from "./NavUser";
import { SignedIn } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-start items-center p-4 gap-4 h-16">
        <Link href="/">
          <h2 className="text-2xl hover:text-amber-200">Casebook</h2>
        </Link>
      </div>
      <div className="flex justify-center items-center p-4 gap-4 h-16">
        <SignedIn>
          <Link href="/tasks">
            <h2 className="text-2xl hover:text-amber-200">View My Tasks</h2>
          </Link>
        </SignedIn>
      </div>
      <div className="flex justify-end items-center p-4 gap-4 h-16">
        <NavUser />
      </div>
    </>
  );
}

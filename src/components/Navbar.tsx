import Link from "next/link";
import NavUser from "./NavUser";
import { SignedIn } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="flex justify-between w-5/6">
      <div className="flex justify-start items-center py-4 gap-4 h-16">
        <Link href="/">
          <h2 className="text-4xl font-semibold font-mono tracking-wide hover:underline hover:underline-offset-6 hover:decoration-2">
            CASEBOOK
          </h2>
        </Link>
      </div>
      <div className="flex">
        <div className="flex justify-center items-center gap-4 pr-8 h-16">
          <SignedIn>
            <Link href="/tasks">
              <h2 className="text-3xl font-semibold hover:underline hover:underline-offset-6 hover:decoration-2">
                View Tasks
              </h2>
            </Link>
          </SignedIn>
        </div>
        <div className="flex justify-end items-center gap-4 h-16">
          <NavUser />
        </div>
      </div>
    </div>
  );
}

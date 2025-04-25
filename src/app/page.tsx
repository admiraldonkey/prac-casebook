import { GetUserAuth } from "@/utils/actions";
import Link from "next/link";
import Button from "@/components/Button";

export default async function Home() {
  const isLoggedIn = await GetUserAuth();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Welcome to Casebook</h1>
      {isLoggedIn ? (
        <>
          <p className="text-2xl font-semibold pt-4 pb-10">
            Signed in as {isLoggedIn.email}
          </p>
          <Link href="/tasks">
            <Button typeName="normal">View Tasks</Button>
          </Link>
        </>
      ) : (
        <>
          <p className="text-2xl font-semibold pt-4 pb-10">
            Please login or create an account via the links below
          </p>
          <div className="w-80 flex justify-between">
            <Link href="/sign-up">
              <Button typeName="normal">Sign Up</Button>
            </Link>
            <Link href="/sign-in">
              <Button typeName="normal">Sign In</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

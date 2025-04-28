import Link from "next/link";

// Page that renders if user tries to visit an invalid route or otherwise fails to access something
export default function NotFound() {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h2 className="text-4xl font-semibold pb-3">Not Found</h2>
      <p className="text-2xl pb-4">Could not find requested resource</p>
      <Link
        href="/"
        className="text-xl hover:underline hover:underline-offset-2"
      >
        {" < Return Home"}
      </Link>
    </div>
  );
}

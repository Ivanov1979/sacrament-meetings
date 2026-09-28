import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          View current and previous sacrament meeting programs.
        </p>

        <Link
          href="/meetings"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          View Meetings
        </Link>
      </div>
    </main>
  );
}
import Image from "next/image";
import Link from "next/link";
import Nav from "./{components}/Nav";

export default function Home() {
  return (
    <div className="relative h-screen w-screen bg-zinc-50  px-20 py-10 max-[800px]:px-16 max-[500px]:px-10">
      <Nav />

      <div className="ml-auto mr-auto mt-20 max-[800px]:mt-24 max-[500px]:mt-28">
        <h1 className="text-8xl font-bold mb-6 max-[890px]:text-6xl max-[800px]:text-4xl max-[500px]:text-2xl">
          <span className="text-indigo-400">Comprehensive Platform</span> <br />
          for Secure Bank Logs, Credit Card Management, <br />
          and Financial Insights.
        </h1>
        <p className="mb-6 max-[500px]:text-sm">
          Manage all your financial data in one secure place, with real-time{" "}
          <br />
          tracking, detailed insights, and easy-to-use tools designed for peace
          of mind.
        </p>

        <Link
          className="rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"
          href={`/dashboard`}
        >
          Launch App
        </Link>
      </div>
    </div>
  );
}

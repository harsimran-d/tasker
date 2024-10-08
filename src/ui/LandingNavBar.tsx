"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LandingNavBar() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-end bg-blue-500 p-4 text-xl text-white">
      {session.status == "authenticated" ? (
        <button>Dashboard</button>
      ) : (
        <button onClick={() => router.push("/signup")}>Get Started</button>
      )}
    </div>
  );
}

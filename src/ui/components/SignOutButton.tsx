"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
      Sign Out
    </button>
  );
}

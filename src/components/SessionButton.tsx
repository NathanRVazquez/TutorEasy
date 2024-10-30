"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SessionButton() {
  const { data: session, status } = useSession();
  const handleLogOutClick = async () => {
    try {
      await signOut({ callbackUrl: "/signin" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {session ? (
        <Button
          className="bg-blue-400 hover:bg-blue-700 text-white w-full"
          onClick={handleLogOutClick}
        >
          Log Out
        </Button>
      ) : (
        <a href="/signin">
          <Button className="bg-blue-400 hover:bg-blue-700" />
          Login
        </a>
      )}
    </>
  );
}

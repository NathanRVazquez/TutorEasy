"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function SessionButton() {
  const { data: session } = useSession();
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
        <Button className="bg-blue-400 hover:bg-blue-700" asChild>
          <a href="/signin">Login</a>
        </Button>
      )}
    </>
  );
}

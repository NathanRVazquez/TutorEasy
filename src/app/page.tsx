// 'use client';

import SessionHeader from "@/components/session-header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <SessionHeader />

      <h1 className="text-3xl">Home Page</h1>
      <Link href="/signin">Go to custom Sign in Page</Link>
    </div>
  );
}

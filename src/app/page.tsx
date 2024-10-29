// 'use client';

import Image from "next/image";
import SessionHeader from "@/components/ui/session-header";
import { signIn } from "next-auth/react";


export default function Home() {


  return (
    <div>
      <SessionHeader></SessionHeader>

      <h1>Home Page</h1>
      <a href="/api/auth/signin">Go to Sign in Page</a>

      <br />
      <br/>
      <a href="/signin">Go to custom Sign in Page</a>
         </div>
  );
}

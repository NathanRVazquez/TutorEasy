// 'use client';

import Image from "next/image";
import SessionHeader from "@/components/ui/session-header";
import { signIn } from "next-auth/react";


export default function Home() {


  
  // const handleLoginClick = async () => {
  //   try {
  //     signIn();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return (
    <div>
      <SessionHeader></SessionHeader>

      <h1>Home Page</h1>
      <a href="/api/auth/signin">Login</a>
      {/* <button
    
    onClick={handleLoginClick}
  >
    Login
  </button> */}
         </div>
  );
}

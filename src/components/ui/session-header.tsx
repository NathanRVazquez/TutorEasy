'use client';
import React from "react";
import { signIn,signOut, useSession } from "next-auth/react";
// import {signIn, signOut} from "next-auth/react"
// import {auth,signIn,signOut}from "../../app/auth";


const SessionHeader = () => {
  const { data: session, status } = useSession();
  const handleLogOutClick = async () => {
    try {
      await signOut({callbackUrl: "/signin"});
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClick = async () => {
    try {
      signIn("azure-ad", {callbackUrl: "/dashboard"});
    } catch (error) {
      console.error(error);
    }
  };
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <header>
      {session ? (
        <>
          <p>Welcome, {session.user?.email || "User"}</p>
          <button onClick={handleLogOutClick}>Logout</button>
        </>
      ) : (

        <button onClick={handleLoginClick}>Login Here</button>
        // <p>You are not logged in</p>
      )}
    </header>
  );
};
export default SessionHeader;
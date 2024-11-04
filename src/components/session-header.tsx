'use client';
import React from "react";
import { signIn, useSession } from "next-auth/react";
import {Button} from "@/components/ui/button";




const SessionHeader = () => {
  const { data: session, status } = useSession();
  // const handleLogOutClick = async () => {
  //   try {
  //     await signOut({callbackUrl: "/signin"});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
           
              <a href="/"> <h1>TutorEasy</h1></a>
          </div>
          <div>
            {session ? (
              <>
                <p>Welcome, {session.user?.email || "User"}</p>
              </>
            ) : (

              <p className="text-red-500">You are not logged in</p>
            )}
          </div>
          <div>
            {session ? (
              <>
                {/* <button className="bg-blue-400 hover:bg-blue-700" onClick={handleLogOutClick}>Logout</button> */}

              </>
            ) : (
              // <Button className="bg-blue-400 hover:bg-blue-700" onClick={handleLoginClick}>Login Here</Button>
              <a href="/signin"> <Button className="bg-blue-400 hover:bg-blue-700" onClick={handleLoginClick}>Login Here</Button></a>
      )}
       </div>
      </div>
  </div>
    </header>
  );
};
export default SessionHeader;
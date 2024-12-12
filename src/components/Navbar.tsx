"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
// import darkgreenlogo from "";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-bold flex items-center">
              <Image
                src={"/dark-green-logo.png"}
                alt="TutorEasy Logo"
                height={50}
                width={50}
                className=""
              />
              TutorEasy
            </Link>
          </div>
          <div>
            <SignedOut>
              <Button asChild className="bg-primary-green">
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

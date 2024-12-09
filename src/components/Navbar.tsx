"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {/* Logo SVG */}
            {/* <svg className="w-8 h-8" viewBox="0 0 400 100">
              <g transform="translate(105, 0) scale(0.3)">
                <path
                  d="M40,50 Q55,50 65,50 T80,50 L90,20 L100,80 L110,50 L120,50 Q135,50 145,50"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M165,35 L165,65 M150,50 L180,50"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle
                  cx="165"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                />
              </g>
            </svg> */}
            <span className="text-xl font-bold">TutorEasy</span>
          </div>
          <div>
            <SignedOut>
              <Button asChild>
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

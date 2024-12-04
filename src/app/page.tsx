import React from "react";
import {
  ChevronRight,
  BookOpen,
  Users,
  BarChart,
  Calendar,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button>
                <Link href="/signin">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Bridging the gap between
                <span className="block text-primary">
                  students and educators
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Enhance the learning experience by connecting CS students,
                tutors, and professors. Identify challenging topics, streamline
                tutoring, and improve curriculum in real-time.
              </p>
              <div className="mt-8 flex items-center space-x-4">
                <Button>
                  Get Started
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              {/* <Card>
                <CardContent className="p-6">
                  <img
                    src="/api/placeholder/600/400"
                    alt="TutorEasy Dashboard Preview"
                    className="rounded-lg w-full"
                  />
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Features that transform learning
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to enhance the student-professor relationship
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <BookOpen className="w-6 h-6 text-primary" />,
                title: "Topic Insights",
                description:
                  "Identify challenging topics for targeted instruction",
              },
              {
                icon: <Users className="w-6 h-6 text-primary" />,
                title: "Peer Learning",
                description:
                  "Students can view common challenges among classmates",
              },
              {
                icon: <BarChart className="w-6 h-6 text-primary" />,
                title: "Real-time Analytics",
                description:
                  "Track tutoring session data for curriculum improvement",
              },
              {
                icon: <Calendar className="w-6 h-6 text-primary" />,
                title: "Tutoring Schedule",
                description:
                  "Easy access to tutoring times for all departments",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <Avatar className="h-12 w-12 bg-primary/10">
                    <AvatarImage alt={feature.title} />
                    <AvatarFallback>{feature.icon}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Ready to enhance your learning experience?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join students, tutors, and professors who are already using
              TutorEasy
            </p>
            <Button className="mt-8" variant="secondary">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Product", "Company", "Resources", "Legal"].map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                  {category}
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Features", "Security", "Pricing", "Demo"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <p className="text-center text-muted-foreground">
            © 2024 TutorEasy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

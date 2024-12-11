import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Suspense } from "react";
import Loading from "./loading";
import { BookPlus } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

const ClassesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const classes = await prisma.class.findMany({
    where: {
      professorTeaching: {
        some: {
          professorId: userId!,
        },
      },
    },
  });

  console.log(classes);

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Classes</h2>
          <p className="text-gray-500 text-sm">
            View all of your classes. You can also create a new class and edit
            or delete an existing class.
          </p>
        </div>
        <Button
          asChild
          className="bg-primary-green hover:bg-secondary-green hover:text-black"
        >
          <Link href="/dashboard/classes/new-class">
            <BookPlus size={24} />
            Create a class
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {classes.map((cls) => (
            <Card
              key={cls.classId}
              className="bg-white rounded-md p-4 drop-shadow-md"
            >
              <CardHeader>
                <CardTitle>{cls.className}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Section: {cls.classSection}</p>
                <p>Guideline: {cls.tutoringGuidelines}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/dashboard/classes/${cls.classId}`}>
                  <Button>See More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default ClassesPage;

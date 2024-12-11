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

const ClassesPage = async () => {
  const classes = await prisma.class.findMany({
    where: {
      professorTeaching: {
        some: {
          professorId: "cm4gjzdsl0002usf8qnvofpq3",
        },
      },
    },
  });

  console.log(classes);

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <h1 className="font-bold text-2xl">Classes</h1>
      <Link href="/dashboard/classes/new-class">
        <Button>Create New Class</Button>
      </Link>
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

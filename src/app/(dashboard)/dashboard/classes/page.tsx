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

type ClassInfo = {
  Class_ID: string;
  Class_Name: string;
  Class_Section: number;
  Tutoring_Guideline: string;
};

const ClassesPage = async () => {
  // const professors_classes: ClassInfo[] = await prisma.$queryRaw`
  // SELECT *
  // FROM "Class" as c
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_prof."User_ID" = 'cm4gjzdsl0002usf8qnvofpq3';
  // `;

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

  async function createClass(
    Class_Name: string,
    Class_Section: number,
    Tutoring_Guideline: string
  ) {
    //  Class_Name String
    // Class_Section Int
    // Tutoring_Guideline String
    if (
      Class_Name == null ||
      Class_Name == "" ||
      Class_Section == null ||
      Class_Section <= 0
    ) {
      throw new Error(
        "Class_Name or Class_Section either null, empty or Class_Section <=0"
      );
    } else if (Tutoring_Guideline == null) {
      Tutoring_Guideline = "";
    }

    const new_class = await prisma.$queryRaw`
  INSERT INTO classes ('Class_Name', 'Class_Section', 'Tutoring_Guideline')
  VALUES (${Class_Name}, ${Class_Section}, ${Tutoring_Guideline});
  `;

    if (new_class == null) {
      throw new Error("New class was not created due to an unexpected error");
    }
  }

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <h1>Classes</h1>
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

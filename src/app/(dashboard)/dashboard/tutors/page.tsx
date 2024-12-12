import React, { Suspense } from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewTutorForm from "@/components/NewTutorForm";
import Tutors from "@/components/Tutors";
import Loading from "./loading";

import { UserRoundPlus } from "lucide-react";

export default async function TutorsPage() {
  const professorId = "user_2q5EtdWObj9OQo1ccZbNixbgCMG";

  const tutors = await prisma.user.findMany({
    where: {
      userType: "Tutor", // Ensures only tutors are considered
    },
    include: {
      professorClasses: {
        include: {
          class: {
            include: {
              tutorSchedules: {
                include: {
                  user: true, // Includes tutor details
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(tutors);

  // const tutorCount = await prisma.user.findMany({
  //   where: {
  //     userId: professorId,
  //   },
  //   select: {
  //     professorClasses: {
  //       select: {
  //         class: {
  //           select: {
  //             tutorSchedules: {
  //               select: {
  //                 user: {
  //                   select: {
  //                     userId: true,
  //                     firstName: true,
  //                     lastName: true,
  //                     email: true,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // console.log(tutorCount.length);
  // const tutorData = tutorCount.flatMap((user) =>
  //   user.professorClasses.flatMap((profClass) =>
  //     profClass.class.tutorSchedules.map((schedule) => schedule.user)
  //   )
  // );

  // console.log(tutorData);

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Tutors</h2>
          <p className="text-gray-500 text-sm">
            View all of the tutors for all of your classes. You can also create
            a new tutor and edit or delete an existing tutor.
          </p>
        </div>
        <Button
          asChild
          className="bg-primary-green hover:bg-secondary-green hover:text-black"
        >
          <Link href="/dashboard/tutors/new-tutor" className="font-bold">
            <UserRoundPlus size={24} />
            Create New Tutor
          </Link>
        </Button>
      </div>

      {/* <Link href={`/dashboard/classes/${classId}/new-tutor`}>
        <Button>Add New Tutor</Button>
      </Link> */}
      <div>
        <Suspense fallback={<Loading />}>
          <Tutors tutors={tutors} />
        </Suspense>
      </div>
    </div>
  );
}

import React, { Suspense } from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewTutorForm from "@/components/NewTutorForm";
import Tutors from "@/components/Tutors";
import Loading from "./loading";

import { UserRoundPlus } from "lucide-react";

export default async function TutorsPage() {
  const professorId = "cm4hzkucc0000usjw0tf5obrh";

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
        <Button asChild>
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

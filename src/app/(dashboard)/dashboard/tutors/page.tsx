import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewTutorForm from "@/components/NewTutorForm";

const TutorsPage = async () => {
  const professors_tutors: {}[] = await prisma.$queryRaw`
  SELECT *
  FROM "ta_schedules" as ts
  JOIN "users" as u_ta ON u_ta."User_ID" = ts."TA_ID"
  JOIN "classes" c ON ts."Class_Assigned" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl';
  `;

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <h1>Tutors</h1>
      <Button asChild>
        <Link href="/dashboard/tutors/new-tutor">Create New Tutor</Link>
      </Button>

      {/* <Link href={`/dashboard/classes/${classId}/new-tutor`}>
        <Button>Add New Tutor</Button>
      </Link> */}
    </div>
  );
};

export default TutorsPage;

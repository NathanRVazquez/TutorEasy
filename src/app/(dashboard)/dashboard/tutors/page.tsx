import React from "react";
import prisma from "@/lib/db";

const TutorsPage = async () => {

  const professors_tutors:{}[] = await prisma.$queryRaw`
  SELECT *
  FROM "ta_schedules" as ts
  JOIN "users" as u_ta ON u_ta."User_ID" = ts."TA_ID"
  JOIN "classes" c ON ts."Class_Assigned" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl';
  ` ;








  
  return <div>TutorsPage</div>;
};

export default TutorsPage;

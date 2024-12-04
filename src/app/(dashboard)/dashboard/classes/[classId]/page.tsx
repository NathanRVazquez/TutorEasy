import React from "react";
import prisma from "@/lib/db";

const ClassPage = async () => {

  // get class id from query paramaters

  const class_info:{}[] = await prisma.$queryRaw`
  SELECT *
  FROM "classes" as c
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  JOIN "ta_schedules" ta_sched ON c."Class_ID" = ta_sched."Class_Assigned"
  JOIN "users" u_ta ON u_ta."User_ID" = ta_sched."TA_ID"
  WHERE c."Class_ID" = '';
  ` ;













  return <div>ClassPage</div>;
};

export default ClassPage;

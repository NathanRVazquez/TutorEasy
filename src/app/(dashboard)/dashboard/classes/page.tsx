import React from "react";
import prisma from "@/lib/db";

const ClassesPage = async () => {

  const professors_classes:{}[] = await prisma.$queryRaw`
  SELECT *
  FROM "classes" as c
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl';
  ` ;


async function createClass(Class_Name:string, Class_Section:number, Tutoring_Guideline:string) {
  //  Class_Name String
  // Class_Section Int
  // Tutoring_Guideline String
  if(Class_Name == null || Class_Name == '' || Class_Section == null || Class_Section <= 0){
    throw new Error('Class_Name or Class_Section either null, empty or Class_Section <=0');
  }else if (Tutoring_Guideline ==null){
    Tutoring_Guideline ='';
  }

  const new_class = await prisma.$queryRaw`
  INSERT INTO classes ('Class_Name', 'Class_Section', 'Tutoring_Guideline')
  VALUES (${Class_Name}, ${Class_Section}, ${Tutoring_Guideline});
  `;

  if(new_class == null){
    throw new Error('New class was not created due to an unexpected error');
  }
  
}



  return <div>ClassesPage</div>;
};

export default ClassesPage;

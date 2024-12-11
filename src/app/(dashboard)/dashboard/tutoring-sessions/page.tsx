"use server";

import React from "react";
import TutoringSessionForm from "@/components/TutoringSessionForm";
import prisma from "@/lib/db";

const TutoringSessionsPage = async () => {
  // const { id } = params; // Assuming you pass the tutor's UID as a parameter
  const professors_tutors = await prisma.user.findMany({
    where: {
      userType: "Tutor", // Ensures only professor are considered
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

  const classes = professors_tutors.flatMap((tutor) =>
    tutor.professorClasses.map((profClass) => profClass.class)
  );

  const class_section = classes.map((class_) => class_.classSection);

  // console.log("tutors: ", professors_tutors);
  // console.log("classes: ", classes);

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <TutoringSessionForm
        tutors={professors_tutors}
        classes={classes}
        class_section={class_section}
      />
    </div>
  );
};

export default TutoringSessionsPage;

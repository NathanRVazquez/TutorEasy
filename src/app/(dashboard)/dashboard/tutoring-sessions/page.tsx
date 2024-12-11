"use server";

import React from "react";
import TutoringSessionForm from "@/components/TutoringSessionForm";
import prisma from "@/lib/db";

const TutoringSessionsPage = async () => {
  const professorsClasses = await prisma.user.findMany({
    where: {
      userId: "user_2q5EtdWObj9OQo1ccZbNixbgCMG",
    },
    select: {
      professorClasses: {
        select: {
          class: {
            select: {
              classId: true,
              className: true,
              classSection: true,
              tutoringGuidelines: true,
            },
          },
        },
      },
    },
  });

  const class_ = professorsClasses.flatMap((user) =>
    user.professorClasses.flatMap((profClass) => profClass.class)
  );

  const professors_tutors = await prisma.user.findMany({
    where: {
      userId: "user_2q5EtdWObj9OQo1ccZbNixbgCMG",
    },
    select: {
      professorClasses: {
        select: {
          class: {
            select: {
              tutorSchedules: {
                select: {
                  user: {
                    select: {
                      userId: true,
                      clerkUserId: true,
                      emplid: true,
                      email: true,
                      firstName: true,
                      lastName: true,
                      imageUrl: true,
                      createdAt: true,
                      updatedAt: true,
                      userType: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const tutors = professors_tutors.flatMap((user) =>
    user.professorClasses.flatMap((profClass) =>
      profClass.class.tutorSchedules.map((schedule) => schedule.user)
    )
  );

  const classes = professors_tutors.flatMap((tutor) =>
    tutor.professorClasses.map((profClass) => profClass.class)
  );

  console.log("tutors: ", tutors);
  console.log("classes: ", classes);

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <TutoringSessionForm
        tutors={tutors}
        classes={class_}
        class_section={class_.map((cls) => cls.classSection)}
      />
    </div>
  );
};

export default TutoringSessionsPage;

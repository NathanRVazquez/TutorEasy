import React from "react";
import AnalyticsCard from "@/components/AnalyticsCard";
import prisma from "@/lib/db";
import { UserType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import HomeDashboardCharts from "@/components/HomeDashboardCharts";
import Classes from "@/components/Classes";
import MostRecentTutoringSessions from "@/components/MostRecentTutoringSessions";

export default async function DashboardHomePage() {
  // retrieve the count of all users with the role - TA
  // TODO: Filter these based on the professor signed in

  // get the time since 1970
  const d = new Date();
  // convert the time to milliseconds
  const curr_time = d.getTime();
  // subtract a month in milliseconds. Milliseconds in minute (1000 * 60)
  // Milliseconds in hour (1000 * 60) *60
  // milliseconds in day (1000 * 60 * 60 * 24)
  // milliseconds in month (1000 * 60 * 60 * 24 * 30)
  const week_prior_milliseconds = curr_time - 604800000;
  const week_prior = new Date(week_prior_milliseconds);
  const month_prior_milliseconds = curr_time - 2628000000;
  const month_prior = new Date(month_prior_milliseconds);
  const quarter_prior_milliseconds = curr_time - 7884000000;
  const quarter_prior = new Date(quarter_prior_milliseconds);

  // const professors_tutors: { ta_count: bigint }[] = await prisma.$queryRaw`
  // SELECT COUNT(*) as ta_count
  // FROM "TutorSchedule" as ts
  // JOIN "User" as u_ta ON u_ta."userId" = ts."tutorId"
  // JOIN "Class" c ON ts."Class_Assigned" = c."Class_ID"
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_ta."UserType" = 'Tutor'
  // AND u_prof."userId" = 'cm4eoknda0001usw0cb9ymo3k'
  // AND u_prof."UserType" = 'Professor';
  // `;

  const { userId } = await auth();

  console.log(userId);

  const user = await prisma.user.findFirst({
    where: {
      clerkUserId: userId!,
    },
  });

  console.log(user);

  const professorId = "cm4hxfwzz0001usj0c41cjhpx"; // Test professor ID from seeded data

  const tutorCount = await prisma.tutorSchedule.count({
    where: {
      user: {
        userType: "Tutor",
      },
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
            user: {
              userType: "Professor",
            },
          },
        },
      },
    },
  });

  console.log(tutorCount);

  // const professors_tutoring_sessions: { ts_count: bigint }[] =
  //   await prisma.$queryRaw`
  // SELECT COUNT(*) as ts_count
  // FROM "tutoring_sessions" as ts
  // JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl' ;
  // `;

  const tutoringSessionCount = await prisma.tutoringSession.count({
    where: {
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
          },
        },
      },
    },
  });

  console.log(tutoringSessionCount);

  // const professors_tutoring_session_engagement: {
  //   ts_attendee_count: number;
  // }[] = await prisma.$queryRaw`
  // SELECT SUM("Students_Tutored") as ts_attendee_count
  // FROM "tutoring_sessions" as ts
  // JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl';
  // `;

  const tutoringSessionEngagement = await prisma.tutoringSession.aggregate({
    _sum: {
      numStudentsTutored: true,
    },
    where: {
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
          },
        },
      },
    },
  });
  const tsAttendeeCount =
    tutoringSessionEngagement._sum.numStudentsTutored ?? 0;
  console.log(tutoringSessionEngagement);
  console.log(tsAttendeeCount);

  // const num_professors_tutors: number = Number(professors_tutors[0].ta_count);
  // const num_professors_tutoring_sessions: number = Number(
  //   professors_tutoring_sessions[0].ts_count
  // );
  // const num_professors_tutoring_engagement: number = Number(
  //   professors_tutoring_session_engagement[0].ts_attendee_count
  // );

  // const num_all_tutoring_sessions = await prisma.tutoringSession.count();

  // all attendees for all sessions. need to filter based on the classes the professors
  // const num_all_attendees = await prisma.attendee_list.count();

  // const professors_tutors_month_prior: { ta_count: bigint }[] =
  //   await prisma.$queryRaw`
  // SELECT COUNT(*) as TA_Count
  // FROM "ta_schedules" as ts
  // JOIN "users" as u_ta ON u_ta."User_ID" = ts."TA_ID"
  // JOIN "classes" c ON ts."Class_Assigned" = c."Class_ID"
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_ta."User_Type" = 'TA'
  // AND u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl'
  // AND u_prof."User_Type" = 'Professor'
  // AND u_ta."Join_Date" < ${month_prior};
  // `;

  const tutorCountLastMonth = await prisma.tutorSchedule.count({
    where: {
      user: {
        userType: UserType.Tutor, // Assuming 'TA' corresponds to 'Tutor'
        createdAt: {
          lt: month_prior, // 'Join_Date' corresponds to 'createdAt'
        },
      },
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
            user: {
              userType: UserType.Professor,
            },
          },
        },
      },
    },
  });

  console.log(tutorCountLastMonth);

  // const tutoring_sessions_week_prior: { ts_count: bigint }[] =
  //   await prisma.$queryRaw`
  // SELECT COUNT(*) as ts_count
  // FROM "tutoring_sessions" as ts
  // JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl'
  // AND ts."Session_Start_Time" < ${week_prior} ;
  // `;

  const tutoringSessionsCountLastWeek = await prisma.tutoringSession.count({
    where: {
      sessionStartTime: {
        lt: week_prior,
      },
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
            user: {
              userType: UserType.Professor,
            },
          },
        },
      },
    },
  });

  console.log(tutoringSessionsCountLastWeek);

  // const session_engagement_semester_prior: { ts_attendee_count: number }[] =
  //   await prisma.$queryRaw`
  // SELECT SUM("Students_Tutored") as ts_attendee_count
  // FROM "tutoring_sessions" as ts
  // JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl'
  // AND ts."Session_Start_Time" < ${quarter_prior};
  // `;

  const sessionEngagementLastSemester = await prisma.tutoringSession.aggregate({
    _sum: {
      numStudentsTutored: true,
    },
    where: {
      sessionStartTime: {
        lt: quarter_prior,
      },
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
            user: {
              userType: UserType.Professor,
            },
          },
        },
      },
    },
  });

  console.log(sessionEngagementLastSemester);
  const tsAttendeeCountLastSemester =
    sessionEngagementLastSemester._sum.numStudentsTutored;

  // console.log(typeof(professors_tutoring_session_engagement[0].ts_attendee_count));
  // console.log(professors_tutoring_session_engagement);

  // const num_tutors_month_prior: number = Number(
  //   professors_tutors_month_prior[0].ta_count
  // );
  // const num_sessions_week_prior: number = Number(
  //   tutoring_sessions_week_prior[0].ts_count
  // );
  // const num_engagement_semester: number = Number(
  //   session_engagement_semester_prior[0].ts_attendee_count
  // );

  // Mock data for the charts, should be fetched here and passed as props to the component(s)
  // const tutoringSessionsData = [
  //   { month: "Jan", sessions: 45 },
  //   { month: "Feb", sessions: 52 },
  //   { month: "Mar", sessions: 61 },
  //   { month: "Apr", sessions: 58 },
  //   { month: "May", sessions: 63 },
  //   { month: "Jun", sessions: 59 },
  // ];

  // const studentPerformanceData = [
  //   { grade: "A", students: 30 },
  //   { grade: "B", students: 45 },
  //   { grade: "C", students: 20 },
  //   { grade: "D", students: 10 },
  //   { grade: "F", students: 5 },
  // ];

  // const courseEnrollmentData = [
  //   { course: "CS101", students: 120 },
  //   { course: "CS201", students: 85 },
  //   { course: "CS301", students: 60 },
  //   { course: "CS401", students: 40 },
  // ];

  // const weeklyActivityData = [
  //   { day: "Mon", lectures: 3, officehours: 2, tutoring: 1 },
  //   { day: "Tue", lectures: 2, officehours: 1, tutoring: 3 },
  //   { day: "Wed", lectures: 3, officehours: 2, tutoring: 2 },
  //   { day: "Thu", lectures: 2, officehours: 1, tutoring: 1 },
  //   { day: "Fri", lectures: 1, officehours: 3, tutoring: 2 },
  // ];

  const classes = await prisma.class.findMany({
    where: {
      professorTeaching: {
        some: {
          professorId: professorId,
        },
      },
    },
  });
  // console.log(classes);

  const mostRecentTutoringSessions = await prisma.tutoringSession.findMany({
    take: 10,
    orderBy: {
      sessionStartTime: "desc",
    },
    where: {
      class: {
        professorTeaching: {
          some: {
            professorId: professorId,
          },
        },
      },
    },
  });
  // console.log(mostRecentTutoringSessions);

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
          <AnalyticsCard
            title="Student Engagement"
            data={tsAttendeeCount}
            filterData={tsAttendeeCount - (tsAttendeeCountLastSemester ?? 0)}
            range={"semester"}
          />
          <AnalyticsCard
            title="Active TAs"
            data={tutorCount}
            filterData={tutorCount - tutorCountLastMonth}
            range={"month"}
          />
          <AnalyticsCard
            title="Tutoring Sessions"
            data={tutoringSessionCount}
            filterData={tutoringSessionCount - tutoringSessionsCountLastWeek}
            range={"week"}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          <Classes classes={classes} />
          <MostRecentTutoringSessions
            tutoringSessions={mostRecentTutoringSessions}
          />
        </div>
        {/* <div className="grid gap-4 md:grid-cols-2 pt-4">
          <HomeDashboardCharts
            tutoringSessionsData={tutoringSessionsData}
            studentPerformanceData={studentPerformanceData}
            courseEnrollmentData={courseEnrollmentData}
            weeklyActivityData={weeklyActivityData}
          />
        </div> */}
        <div></div>
      </div>
    </div>
  );
}

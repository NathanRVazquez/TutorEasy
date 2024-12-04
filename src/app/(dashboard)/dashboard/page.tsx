import React from "react";
import AnalyticsCard from "@/components/AnalyticsCard";
import prisma from "@/lib/db";
import { Users } from "lucide-react";
import { User_Type } from "@prisma/client";
import { getDefaultAutoSelectFamilyAttemptTimeout } from "net";

import { useSession } from "next-auth/react";

// export function getUser(){
//   const { data: session } = useSession();
//   if(!session || !session.user){
//     throw new Error();
//   }
//   return session.user.email;
//   }

//   if(!getUser()){
//     throw new Error();
//   }
//   let users_email: string = getUser() as string;

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

  // const Professor_ID = await prisma.users.findFirst({
  //   where: {
  //     Email: "nathanrvazquez@gmail.com",
  //   },
  // });

  // if (!Professor_ID) {
  //   throw new Error();
  // }

  const professors_tutors: { ta_count: bigint }[] = await prisma.$queryRaw`
  SELECT COUNT(*) as ta_count
  FROM "ta_schedules" as ts
  JOIN "users" as u_ta ON u_ta."User_ID" = ts."TA_ID"
  JOIN "classes" c ON ts."Class_Assigned" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_ta."User_Type" = 'TA'
  AND u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl' 
  AND u_prof."User_Type" = 'Professor';
  `;

  const professors_tutoring_sessions: { ts_count: bigint }[] =
    await prisma.$queryRaw`
  SELECT COUNT(*) as ts_count
  FROM "tutoring_sessions" as ts
  JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl' ;
  `;

  const professors_tutoring_session_engagement: {
    ts_attendee_count: number;
  }[] = await prisma.$queryRaw`
  SELECT SUM("Students_Tutored") as ts_attendee_count
  FROM "tutoring_sessions" as ts
  JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl';
  `;

  const num_professors_tutors: number = Number(professors_tutors[0].ta_count);
  const num_professors_tutoring_sessions: number = Number(
    professors_tutoring_sessions[0].ts_count
  );
  const num_professors_tutoring_engagement: number = Number(
    professors_tutoring_session_engagement[0].ts_attendee_count
  );

  const num_all_tutoring_sessions = await prisma.tutoring_sessions.count();

  // all attendees for all sessions. need to filter based on the classes the professors
  // const num_all_attendees = await prisma.attendee_list.count();

  const professors_tutors_month_prior: { ta_count: bigint }[] =
    await prisma.$queryRaw`
  SELECT COUNT(*) as TA_Count
  FROM "ta_schedules" as ts
  JOIN "users" as u_ta ON u_ta."User_ID" = ts."TA_ID"
  JOIN "classes" c ON ts."Class_Assigned" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_ta."User_Type" = 'TA'
  AND u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl' 
  AND u_prof."User_Type" = 'Professor'
  AND u_ta."Join_Date" < ${month_prior};
  `;

  const tutoring_sessions_week_prior: { ts_count: bigint }[] =
    await prisma.$queryRaw`
  SELECT COUNT(*) as ts_count
  FROM "tutoring_sessions" as ts
  JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl'
  AND ts."Session_Start_Time" < ${week_prior} ;
  `;

  const session_engagement_semester_prior: { ts_attendee_count: number }[] =
    await prisma.$queryRaw`
  SELECT SUM("Students_Tutored") as ts_attendee_count
  FROM "tutoring_sessions" as ts
  JOIN "classes" c ON ts."Class_Tutored" = c."Class_ID"
  JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  WHERE u_prof."User_ID" = 'cm48pblb00000buw0i0udjhzl'
  AND ts."Session_Start_Time" < ${quarter_prior};
  `;

  // console.log(typeof(professors_tutoring_session_engagement[0].ts_attendee_count));
  console.log(professors_tutoring_session_engagement);
  const num_tutors_month_prior: number = Number(
    professors_tutors_month_prior[0].ta_count
  );
  const num_sessions_week_prior: number = Number(
    tutoring_sessions_week_prior[0].ts_count
  );
  const num_engagement_semester: number = Number(
    session_engagement_semester_prior[0].ts_attendee_count
  );

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
          <AnalyticsCard
            title="Engagement"
            data={num_professors_tutoring_engagement}
            filterData={
              num_professors_tutoring_engagement - num_engagement_semester
            }
            range={"semester"}
          />
          <AnalyticsCard
            title="Active TAs"
            data={num_professors_tutors}
            filterData={num_professors_tutors - num_tutors_month_prior}
            range={"month"}
          />
          <AnalyticsCard
            title="Tutoring Sessions"
            data={num_professors_tutoring_sessions}
            filterData={
              num_professors_tutoring_sessions - num_sessions_week_prior
            }
            range={"week"}
          />
        </div>
      </div>
    </div>
  );
}

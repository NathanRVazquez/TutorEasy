"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface HomeDashboardChartsProps {
  tutoringSessionsData: { month: string; sessions: number }[];
  studentPerformanceData: { grade: string; students: number }[];
  courseEnrollmentData: { course: string; students: number }[];
  weeklyActivityData: {
    day: string;
    lectures: number;
    officehours: number;
    tutoring: number;
  }[];
}

export default function HomeDashboardCharts({
  tutoringSessionsData,
  studentPerformanceData,
  courseEnrollmentData,
  weeklyActivityData,
}: HomeDashboardChartsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tutoring Sessions</CardTitle>
          <CardDescription>
            Monthly tutoring sessions over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sessions: {
                label: "Sessions",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tutoringSessionsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="var(--color-sessions)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
          <CardDescription>
            Grade distribution across all courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              students: {
                label: "Students",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentPerformanceData}
                  dataKey="students"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="var(--color-students)"
                  label
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Enrollment</CardTitle>
          <CardDescription>
            Number of students enrolled in each course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              students: {
                label: "Students",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseEnrollmentData}>
                <XAxis dataKey="course" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="students" fill="var(--color-students)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>
            Distribution of lectures, office hours, and tutoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              lectures: {
                label: "Lectures",
                color: "hsl(var(--chart-4))",
              },
              officehours: {
                label: "Office Hours",
                color: "hsl(var(--chart-5))",
              },
              tutoring: {
                label: "Tutoring",
                color: "hsl(var(--chart-6))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="lectures"
                  stackId="a"
                  fill="var(--color-lectures)"
                />
                <Bar
                  dataKey="officehours"
                  stackId="a"
                  fill="var(--color-officehours)"
                />
                <Bar
                  dataKey="tutoring"
                  stackId="a"
                  fill="var(--color-tutoring)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}

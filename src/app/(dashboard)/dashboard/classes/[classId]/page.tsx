"use client";

import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewTutorForm from "@/components/NewTutorForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Users, BookOpen, AlertTriangle } from "lucide-react";

import { motion } from "framer-motion";

type Params = {
  params: Promise<{
    classId: string;
  }>;
};

const ClassPage = async (props: Params) => {
  const params = await props.params;
  // get class id from query paramaters
  const classId = params.classId;
  console.log(classId);

  const classData = {
    classId: classId as string,
    className: "Software Design and Analysis",
    classSection: 5,
    tutoringGuidelines:
      "Numquam cuius corrumpo. Vita alveus tabula ea cupressus demo architecto asper ulterius utroque.",
    professor: {
      userId: "prof123",
      firstName: "Jane",
      lastName: "Smith",
      imageUrl: "/placeholder.svg?height=50&width=50",
    },
    tutors: [
      {
        userId: "tutor1",
        firstName: "John",
        lastName: "Doe",
        imageUrl: "/placeholder.svg?height=40&width=40",
        schedule: [
          {
            assignedDay: "Monday",
            shiftStartTime: "10:00",
            shiftEndTime: "12:00",
          },
          {
            assignedDay: "Wednesday",
            shiftStartTime: "14:00",
            shiftEndTime: "16:00",
          },
        ],
      },
      {
        userId: "tutor2",
        firstName: "Alice",
        lastName: "Johnson",
        imageUrl: "/placeholder.svg?height=40&width=40",
        schedule: [
          {
            assignedDay: "Tuesday",
            shiftStartTime: "13:00",
            shiftEndTime: "15:00",
          },
          {
            assignedDay: "Thursday",
            shiftStartTime: "11:00",
            shiftEndTime: "13:00",
          },
        ],
      },
    ],
    insights: {
      studentInsights:
        "Students are showing good progress in basic programming concepts but struggle with advanced data structures.",
      tutorInsights:
        "More emphasis needed on practical coding exercises and real-world applications.",
    },
    recentSessions: [
      {
        sessionId: "session1",
        tutorId: "tutor1",
        tutorFirstName: "John",
        tutorLastName: "Doe",
        sessionStartTime: "2023-11-15T10:00:00Z",
        sessionEndTime: "2023-11-15T12:00:00Z",
        numStudentsTutored: 5,
        sessionLocation: "Room 101",
        chapterReviewed: "Introduction to Arrays",
        insights: [
          {
            topic: "Arrays",
            studentInsights: "Students grasped basic array concepts well.",
            tutorInsights: "Need more practice with multi-dimensional arrays.",
          },
        ],
        concerns: [],
      },
      {
        sessionId: "session2",
        tutorId: "tutor2",
        tutorFirstName: "Alice",
        tutorLastName: "Johnson",
        sessionStartTime: "2023-11-13T13:00:00Z",
        sessionEndTime: "2023-11-13T15:00:00Z",
        numStudentsTutored: 7,
        sessionLocation: "Online",
        chapterReviewed: "Recursion",
        insights: [
          {
            topic: "Recursion",
            studentInsights: "Students found recursion challenging.",
            tutorInsights:
              "More visual examples needed for recursive functions.",
          },
        ],
        concerns: [
          {
            topic: "Recursion",
            concerns:
              "Students are having difficulty understanding the concept of recursion and its practical applications.",
          },
        ],
      },
    ],
  };
  // const class_info: {}[] = await prisma.$queryRaw`
  // SELECT *
  // FROM "classes" as c
  // JOIN "professor_classes" pc ON c."Class_ID" = pc."Class_ID"
  // JOIN "users" u_prof ON pc."Professor_ID" = u_prof."User_ID"
  // JOIN "ta_schedules" ta_sched ON c."Class_ID" = ta_sched."Class_Assigned"
  // JOIN "users" u_ta ON u_ta."User_ID" = ta_sched."TA_ID"
  // WHERE c."Class_ID" = '';
  // `;

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-2xl">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{classData.className}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <div className="">
                  <p className="font-medium">{classData.classSection}</p>
                </div>
                <div className="">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={classData.professor.imageUrl}
                        alt={`${classData.professor.firstName} ${classData.professor.lastName}`}
                      />
                      <AvatarFallback className="font-bold">
                        {classData.professor.firstName[0]}
                        {classData.professor.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {classData.professor.firstName}{" "}
                    {classData.professor.lastName}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {classData.tutoringGuidelines}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Class Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tutors">
                <TabsList>
                  <TabsTrigger value="tutors">Tutors</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
                </TabsList>
                <TabsContent value="tutors">
                  <div className="space-y-4">
                    {classData.tutors.map((tutor) => (
                      <Card key={tutor.userId}>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={tutor.imageUrl}
                                alt={`${tutor.firstName} ${tutor.lastName}`}
                              />
                              <AvatarFallback>
                                {tutor.firstName[0]}
                                {tutor.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            {tutor.firstName} {tutor.lastName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-2">Schedule:</h4>
                          <ul className="space-y-1">
                            {tutor.schedule.map((slot, slotIndex) => (
                              <li key={slotIndex} className="flex items-center">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                {slot.assignedDay}: {slot.shiftStartTime} -{" "}
                                {slot.shiftEndTime}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="insights">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{classData.insights.studentInsights}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Tutor Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{classData.insights.tutorInsights}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="sessions">
                  <div className="space-y-4">
                    {classData.recentSessions.map((session) => (
                      <Card key={session.sessionId}>
                        <CardHeader>
                          <CardTitle>
                            {new Date(
                              session.sessionStartTime
                            ).toLocaleDateString()}
                          </CardTitle>
                          <CardDescription>
                            Tutor: {session.tutorFirstName}{" "}
                            {session.tutorLastName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              <span>
                                {session.numStudentsTutored} students attended
                              </span>
                            </div>
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-2" />
                              <span>
                                {new Date(
                                  session.sessionStartTime
                                ).toLocaleTimeString()}{" "}
                                -{" "}
                                {new Date(
                                  session.sessionEndTime
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-2" />
                              <span>Chapter: {session.chapterReviewed}</span>
                            </div>
                            {session.insights.map((insight, index) => (
                              <div key={index} className="mt-2">
                                <h4 className="font-semibold">
                                  Insights on {insight.topic}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Student: {insight.studentInsights}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Tutor: {insight.tutorInsights}
                                </p>
                              </div>
                            ))}
                            {session.concerns.map((concern, index) => (
                              <div key={index} className="mt-2">
                                <h4 className="font-semibold flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                                  Concern: {concern.topic}
                                </h4>
                                <p className="mt-1 text-sm text-gray-600">
                                  {concern.concerns}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassPage;

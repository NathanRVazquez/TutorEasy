/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Professor', 'Tutor', 'Student');

-- DropTable
DROP TABLE "Users";

-- DropEnum
DROP TYPE "User_Type";

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "emplid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'Student',

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TutorSchedule" (
    "tutorId" TEXT NOT NULL,
    "assignedClass" TEXT NOT NULL,
    "assignedDay" TEXT NOT NULL,
    "shiftStartTime" TIMESTAMP(3) NOT NULL,
    "shiftEndTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorSchedule_pkey" PRIMARY KEY ("tutorId","assignedClass","assignedDay")
);

-- CreateTable
CREATE TABLE "ProfessorClass" (
    "professorId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "ProfessorClass_pkey" PRIMARY KEY ("professorId","classId")
);

-- CreateTable
CREATE TABLE "Class" (
    "classId" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classSection" INTEGER NOT NULL,
    "tutoringGuidelines" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "ClassInsights" (
    "classId" TEXT NOT NULL,
    "studentInsights" TEXT NOT NULL,
    "tutorInsights" TEXT NOT NULL,

    CONSTRAINT "ClassInsights_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "TutoringSession" (
    "sessionId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "classTutored" TEXT NOT NULL,
    "sessionLocation" TEXT,
    "chapterReviewed" TEXT,
    "classSection" INTEGER NOT NULL,
    "sessionStartTime" TIMESTAMP(3) NOT NULL,
    "sessionEndTime" TIMESTAMP(3) NOT NULL,
    "numStudentsTutored" INTEGER NOT NULL,

    CONSTRAINT "TutoringSession_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "TutoringAttendees" (
    "sessionId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "TutoringAttendees_pkey" PRIMARY KEY ("sessionId","studentId")
);

-- CreateTable
CREATE TABLE "SessionInsights" (
    "sessionId" TEXT NOT NULL,
    "studentInsights" TEXT NOT NULL,
    "tutorInsights" TEXT NOT NULL,

    CONSTRAINT "SessionInsights_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "SessionConcerns" (
    "sessionId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "concerns" TEXT NOT NULL,

    CONSTRAINT "SessionConcerns_pkey" PRIMARY KEY ("sessionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_emplid_key" ON "User"("emplid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Class_classId_key" ON "Class"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassInsights_classId_key" ON "ClassInsights"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "TutoringSession_sessionId_key" ON "TutoringSession"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "TutoringAttendees_studentEmail_key" ON "TutoringAttendees"("studentEmail");

-- CreateIndex
CREATE UNIQUE INDEX "TutoringAttendees_studentId_key" ON "TutoringAttendees"("studentId");

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSchedule" ADD CONSTRAINT "TutorSchedule_assignedClass_fkey" FOREIGN KEY ("assignedClass") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorClass" ADD CONSTRAINT "ProfessorClass_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorClass" ADD CONSTRAINT "ProfessorClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassInsights" ADD CONSTRAINT "ClassInsights_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutoringSession" ADD CONSTRAINT "TutoringSession_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutoringSession" ADD CONSTRAINT "TutoringSession_classTutored_fkey" FOREIGN KEY ("classTutored") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutoringAttendees" ADD CONSTRAINT "TutoringAttendees_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TutoringSession"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionInsights" ADD CONSTRAINT "SessionInsights_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TutoringSession"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionConcerns" ADD CONSTRAINT "SessionConcerns_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TutoringSession"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

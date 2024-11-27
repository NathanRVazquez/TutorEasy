-- CreateEnum
CREATE TYPE "User_Type" AS ENUM ('Professor', 'Student', 'TA');

-- CreateTable
CREATE TABLE "users" (
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "join_date" TIMESTAMP(6)
);

-- CreateTable
CREATE TABLE "Users" (
    "User_ID" TEXT NOT NULL,
    "Student_Email" TEXT NOT NULL,
    "Student_Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Join_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Signin_Method" TEXT NOT NULL,
    "User_Type" "User_Type" NOT NULL DEFAULT 'Student',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("User_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Student_Email_key" ON "Users"("Student_Email");

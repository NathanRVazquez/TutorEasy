import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Tutoring session route:", data);

    // Create a new summary within the respective class
    const tutoringSession = await prisma.tutoringSession.create({
      data: {
        tutorId: data.tutorId,
        classTutored: data.classTutored,
        classSection: data.class_section,
        sessionStartTime: data.start_time,
        sessionEndTime: data.end_time,
        numStudentsTutored: data.students,
        tutor: data.name,
        class: data.class,
      },
    });

    const sessionInsights = await prisma.sessionInsights.create({
      data: {
        sessionId: tutoringSession.sessionId,
        studentInsights: data.observationSummary,
        topic: data.topic,
        tutorInsights: data.tutorSummary,
      },
    });

    const sessionConcerns = await prisma.sessionConcerns.create({
      data: {
        sessionId: tutoringSession.sessionId,
        concerns: data.observations,
        topic: data.topic,
      },
    });

    console.log("Tutoring session created:", tutoringSession);
    console.log("Session insights created:", sessionInsights);
    console.log("Session concerns created:", sessionConcerns);

    return NextResponse.json({
      message: "Summaries saved successfully",
      data,
    });
  } catch (error) {
    console.error("Error saving summaries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

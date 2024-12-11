import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Tutoring session route:", data);

    // Create a new summary within the respective class
    const tutoringSession = await prisma.tutoringSession.create({
      data: {
        // tutorId: data.tutorId,
        sessionStartTime: data.start_time,
        sessionEndTime: data.end_time,
        numStudentsTutored: data.students,
        overallSummary: data.overallSummary,
        // tutor: data.name,
        classId: data.class,
        // class: data.class,
        sessionInsights: {
          create: {
            observationSummary: data.observationSummary,
            tutorInsights: data.
          },
        },
      },
    });

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

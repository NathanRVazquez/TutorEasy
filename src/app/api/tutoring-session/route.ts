import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { observationsSummary, overallSummary, classId } = await req.json();

    // Create a new summary within the respective class
    const newSummary = await prisma.tutoringSession.create({
      where { classId: classId },
      data: {
        observationsSummary: observationsSummary,
        overallSummary: overallSummary,
        sessionStartTime: new Date(), // replace with actual value
        sessionEndTime: new Date(), // replace with actual value
        numStudentsTutored: 0, // replace with actual value
      },
    });

    return NextResponse.json({
      message: "Summaries saved successfully",
      newSummary,
    });
  } catch (error) {
    console.error("Error saving summaries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

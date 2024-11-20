import { NextRequest, NextResponse } from "next/server";

interface TutorFormInfo {
  name: string;
  start_time: string;
  end_time: string;
  students: number;
  topics: string[];
}

// export async function GET(request: NextRequest) {
//     try {
//         // fetch object from tutor form submission
//         const tutorFormInfo = await request.json<>();

// }

import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const prompt = `You are an AI designed to create concise summaries of tutoring session observations for a web application aimed at improving communication between computer science students, tutors, and professors. 

Given the input data from a tutor's form submission, generate a summary of observations for each topic discussed during the tutoring session. The summary should:
- Clearly state each topic and its corresponding observation.
- Highlight patterns or repeated concerns if the same topic is mentioned multiple times.
- Use a professional and neutral tone to ensure it is useful for professors, tutors, and students.

For example:
Input:
{
  "sessionId": "12345",
  "topics": [
    { "topicName": "Recursion", "observation": "Students struggled with understanding the base case in recursive functions." },
    { "topicName": "Pointers", "observation": "Difficulty in grasping the concept of memory addresses and dereferencing." },
    { "topicName": "Recursion", "observation": "Several students asked about implementing recursion for factorial problems." }
  ]
}

Output:
Session ID: 12345
- Recursion: Students found the base case of recursive functions challenging. Additionally, there were multiple questions about applying recursion to solve factorial problems.
- Pointers: Students showed difficulty understanding memory addresses and the process of dereferencing.

Your task is to generate summaries like the example above based on the provided data.
`;

const updatedSummary = z.object({
  sessionInfo: z.array(
    z.object({
      topic: z.string(),
      observationSummary: z.string(),
    })
  ),
  overallSummary: z.string(),
});

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // create an instance of the OpenAI API client
  if (!req.body) {
    throw new Error("Request body is required");
  }
  const text = await req.json(); // turns the tutor form submission into a JSON object

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: text,
      },
    ],
    response_format: zodResponseFormat(updatedSummary, "observations"),
  });
  console.log(completion);

  return NextResponse.json(completion.choices[0].message.parsed);
}

// export async function GET(request: NextRequest) {
//     try {
//         // fetch object from tutor form submission
//         const tutorFormInfo = await request.json<>();

// }

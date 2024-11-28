import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const prompt = `You are an AI designed to generate structured summaries of tutoring session observations for a web application. 

Given a list of topics and their respective observations from a tutoring session, your task is to:
1. Create a general summary for each topic based on its observations. The summary should highlight key challenges or insights observed during the session without repeating information already found in the input data.
2. If there is more than one topic, provide an overall summary that combines insights from all topics, highlighting key challenges and patterns observed.

The output should be structured as follows:
{
  "sessionInfo": [
    {
      "topic": "<Topic Name>",
      "observationSummary": "<Summary of observations for this topic>"
    },
    ...
  ],
  "overallSummary": "<Summary of all observations if there is more than one topic>"
}

For example:
Input:
{
  "topics": [
    { "topicName": "Hashing", "observation": "The student struggled with understanding hash functions and collision resolution strategies." },
    { "topicName": "Heaps", "observation": "The student had difficulty understanding the heapify process and how heaps are represented as arrays." },
    { "topicName": "Hashing", "observation": "Questions were raised about why a good hash function minimizes collisions." }
  ]
}

Output:
{
  "sessionInfo": [
    {
      "topic": "Hashing",
      "observationSummary": "The student struggled with understanding hash functions, collision resolution strategies, and the importance of minimizing collisions with a good hash function."
    },
    {
      "topic": "Heaps",
      "observationSummary": "The student had difficulty understanding the heapify process and how heaps are represented as arrays."
    }
  ],
  "overallSummary": "The session highlighted challenges with core data structures, specifically understanding hashing techniques and heap operations. Students seemed to need more clarity on foundational concepts like collision resolution and array-based heap representation."
}

Use this structure for all outputs. Keep the tone professional and clear.

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
  const body = await req.json();

  const data = {
    sessionId: body.sessionId,
    topics: body.topics,
  };

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: JSON.stringify(data),
        },
      ],
      response_format: zodResponseFormat(updatedSummary, "observations"),
    });
    console.log(completion);

    return NextResponse.json(completion.choices[0].message.parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
// export async function GET(request: NextRequest) {
//     try {
//         // fetch object from tutor form submission
//         const tutorFormInfo = await request.json<>();

// }

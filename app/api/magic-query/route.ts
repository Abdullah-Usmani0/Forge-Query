import { inngest } from "@/app/inngest/client";
import { NextResponse } from 'next/server';

export const config = {
  runtime: "edge",
};

// Create a simple async Next.js API route handler
export async function POST(request: Request) {
  //build the data using the request body 
  const res = await request.json();
  const userPrompt: string = res.userPrompt;
  const userId: string = res.userId;
  const userEmail: string = res.userEmail;

  // Send your event payload to Inngest
  await inngest.send({
    name: "ai/generate.kpis",
    user: { email: userEmail, user_id: userId},
    data: {
      userPrompt: userPrompt,
    },
  });

  return NextResponse.json({ name: "Job Queued: Generate KPIs" });
}
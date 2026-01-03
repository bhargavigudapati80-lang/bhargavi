import { NextRequest } from "next/server";
import { runFlow } from "genkit";
import "@/ai/genkit"; // important: registers flows

export async function POST(req: NextRequest) {
  return runFlow(req);
}

export async function GET(req: NextRequest) {
  return runFlow(req);
}


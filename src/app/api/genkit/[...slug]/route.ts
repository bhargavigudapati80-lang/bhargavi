import { NextRequest } from "next/server";
import { runFlow } from "genkit";
import "@/ai/genkit"; // ensures flows are registered

export async function POST(req: NextRequest) {
  return runFlow(req);
}

export async function GET(req: NextRequest) {
  return runFlow(req);
}

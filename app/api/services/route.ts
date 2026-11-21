import { NextRequest, NextResponse } from "next/server";
import { checkServices } from "@/lib/detector";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const out = await checkServices(body || {});
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}

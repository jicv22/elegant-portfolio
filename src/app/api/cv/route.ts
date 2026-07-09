import { NextResponse } from "next/server";
import { cvDownload } from "@/config/cv";

export const runtime = "nodejs";

export async function GET() {
  if (!cvDownload.enabled) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.redirect(new URL(cvDownload.routePath, "https://"));
}

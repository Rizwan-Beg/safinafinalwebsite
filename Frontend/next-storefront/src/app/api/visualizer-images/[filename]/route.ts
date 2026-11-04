import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Strict filename validation to completely prevent directory traversal
    if (!filename || !/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg)$/.test(filename)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const visualizerUrl = process.env.VISUALIZER_API_URL || "http://localhost:8000";
    const upstreamUrl = `${visualizerUrl.replace(/\/$/, "")}/images/${filename}`;

    const res = await fetch(upstreamUrl, {
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Visualizer image not found" }, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || (filename.endsWith(".png") ? "image/png" : "image/jpeg");
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, immutable",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch image upstream";
    console.error("Visualizer image proxy error:", err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

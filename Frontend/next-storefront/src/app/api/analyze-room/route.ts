import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Safely reject arbitrary filesystem paths
    if (formData.has("room_path")) {
      return NextResponse.json(
        { error: "Direct room_path is disabled for security. Please upload a room_image." },
        { status: 400 }
      );
    }

    const file = formData.get("room_image") as File | null;
    if (!file || !(file instanceof Blob) || file.size === 0) {
      return NextResponse.json({ error: "No room image provided" }, { status: 400 });
    }

    const visualizerUrl = process.env.VISUALIZER_API_URL || "http://localhost:8000";
    const endpoint = `${visualizerUrl.replace(/\/$/, "")}/api/analyze-room`;

    // Forward multipart form data to FastAPI visualizer service
    const upstreamForm = new FormData();
    upstreamForm.append("room_image", file, file.name || "room.jpg");

    let upstreamRes: Response;
    try {
      upstreamRes = await fetch(endpoint, {
        method: "POST",
        body: upstreamForm,
        signal: AbortSignal.timeout(35000), // 35s timeout for AI inference
      });
    } catch (networkErr: unknown) {
      const isTimeout =
        networkErr instanceof Error &&
        (networkErr.name === "TimeoutError" || (networkErr as { code?: number }).code === 23);
      console.error("FastAPI visualizer service unreachable:", networkErr);
      return NextResponse.json(
        {
          error: isTimeout
            ? "Room analysis timed out. The AI model is taking longer than expected."
            : "The AI visualizer service is currently unavailable. Please verify the backend service is running.",
        },
        { status: 503 }
      );
    }

    if (!upstreamRes.ok) {
      let upstreamErr = "Upstream analysis failed";
      try {
        const errJson = await upstreamRes.json();
        if (errJson?.error) upstreamErr = errJson.error;
      } catch {
        // ignore parse error
      }
      return NextResponse.json({ error: upstreamErr }, { status: upstreamRes.status });
    }

    const analysis = await upstreamRes.json();

    // Securely rewrite image URLs to use the same-origin proxy
    // /images/mask_xxx.png -> /api/visualizer-images/mask_xxx.png
    if (typeof analysis.occlusion_mask_url === "string") {
      const parts = analysis.occlusion_mask_url.split("/");
      const maskFilename = parts[parts.length - 1];
      if (/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg)$/.test(maskFilename)) {
        analysis.occlusion_mask_url = `/api/visualizer-images/${maskFilename}`;
      }
    }

    if (typeof analysis.debug_overlay_url === "string") {
      const parts = analysis.debug_overlay_url.split("/");
      const debugFilename = parts[parts.length - 1];
      if (/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg)$/.test(debugFilename)) {
        analysis.debug_overlay_url = `/api/visualizer-images/${debugFilename}`;
      }
    }

    return NextResponse.json(analysis);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Analysis request failed";
    console.error("Room analysis route error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

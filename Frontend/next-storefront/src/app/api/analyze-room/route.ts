import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

const execFileAsync = promisify(execFile);

async function runLocalCliAnalysis(file: Blob, originalName: string) {
  const candidateScripts = [
    path.resolve(process.cwd(), "../Backend/visualizer/cli_analyze.py"),
    path.resolve(process.cwd(), "Backend/visualizer/cli_analyze.py"),
    path.resolve(process.cwd(), "../../Backend/visualizer/cli_analyze.py"),
  ];

  let scriptPath: string | null = null;
  for (const p of candidateScripts) {
    if (fs.existsSync(p)) {
      scriptPath = p;
      break;
    }
  }

  if (!scriptPath) {
    throw new Error("Local visualizer analysis script not found");
  }

  const tmpId = crypto.randomUUID();
  const ext = path.extname(originalName) || ".jpg";
  const tmpFilePath = path.join(os.tmpdir(), `room_upload_${tmpId}${ext}`);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.promises.writeFile(tmpFilePath, buffer);

  try {
    const { stdout } = await execFileAsync("python3", [scriptPath, tmpFilePath], {
      maxBuffer: 15 * 1024 * 1024,
      timeout: 45000,
    });

    const lines = stdout.trim().split("\n");
    const lastLine = lines[lines.length - 1];
    return JSON.parse(lastLine);
  } finally {
    try {
      await fs.promises.unlink(tmpFilePath);
    } catch {
      // ignore tmp cleanup error
    }
  }
}

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

    const filename = file.name || "room.jpg";
    const visualizerUrl = process.env.VISUALIZER_API_URL || "http://localhost:8000";
    const endpoint = `${visualizerUrl.replace(/\/$/, "")}/api/analyze-room`;

    let analysis: any = null;

    // 1. Try forwarding to FastAPI visualizer service first
    try {
      const upstreamForm = new FormData();
      upstreamForm.append("room_image", file, filename);

      const upstreamRes = await fetch(endpoint, {
        method: "POST",
        body: upstreamForm,
        signal: AbortSignal.timeout(35000), // 35s timeout for AI inference
      });

      if (upstreamRes.ok) {
        analysis = await upstreamRes.json();
      } else {
        console.warn(`Upstream FastAPI returned status ${upstreamRes.status}, falling back to local runner`);
      }
    } catch (networkErr: unknown) {
      console.warn("FastAPI visualizer service unreachable, falling back to local CLI execution:", networkErr);
    }

    // 2. Resilient fallback to local Python CLI runner if upstream was unreachable
    if (!analysis) {
      try {
        analysis = await runLocalCliAnalysis(file, filename);
      } catch (cliErr: unknown) {
        console.error("Local visualizer CLI runner failed:", cliErr);
        return NextResponse.json(
          {
            error: "The AI visualizer service is currently unavailable. Please verify the backend service is running.",
          },
          { status: 503 }
        );
      }
    }

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

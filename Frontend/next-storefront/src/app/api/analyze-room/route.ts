import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";
import os from "os";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("room_image") as File | null;
    const roomPath = formData.get("room_path") as string | null;

    let targetFilePath = "";
    let isTemp = false;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const tempPath = path.join(os.tmpdir(), `room_upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`);
      await fs.writeFile(tempPath, buffer);
      targetFilePath = tempPath;
      isTemp = true;
    } else if (roomPath) {
      targetFilePath = roomPath;
    } else {
      return NextResponse.json({ error: "No room image provided" }, { status: 400 });
    }

    const scriptPath = path.resolve(process.cwd(), "../../Backend/visualizer/cli_analyze.py");
    const masksOutDir = path.resolve(process.cwd(), "public/visualizer-masks");
    await fs.mkdir(masksOutDir, { recursive: true });

    // Execute Python analyzer using system Python 3 with MPS GPU acceleration
    const { stdout, stderr } = await execFileAsync("python3", [scriptPath, targetFilePath, masksOutDir], {
      timeout: 30000,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (isTemp) {
      fs.unlink(targetFilePath).catch(() => {});
    }

    // Find valid JSON in stdout
    const lines = stdout.trim().split("\n");
    let jsonStr = "";
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith("{") && lines[i].trim().endsWith("}")) {
        jsonStr = lines[i].trim();
        break;
      }
    }

    if (!jsonStr) {
      console.error("Python analysis error. Stderr:", stderr, "Stdout:", stdout);
      return NextResponse.json({ error: "Failed to parse analysis result" }, { status: 500 });
    }

    const analysis = JSON.parse(jsonStr);
    return NextResponse.json(analysis);
  } catch (err: any) {
    console.error("Room analysis route failed:", err);
    return NextResponse.json({ error: err.message || "Analysis error" }, { status: 500 });
  }
}


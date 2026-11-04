"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import {
  applyH,
  canvasToImage,
  coverLayout,
  floorToImageH,
  imageToCanvas,
  invertH,
  pointInPolygon,
  polygonCentroid,
  rugFloorCorners,
  type FloorQuad,
  type FloorSize,
  type ImageLayout,
  type PlacedRug,
  type Vec2,
} from "./floorMath";

export type PointerTool = "move" | "under" | "reveal";

type Props = {
  roomSrc: string;
  floor: FloorQuad;
  floorSize: FloorSize;
  rugs: PlacedRug[];
  selectedId: string | null;
  calibrating: boolean;
  tool: PointerTool;
  occlusion: ImageData | null;
  occlusionMaskUrl?: string | null;
  showDebug?: boolean;
  debugOverlayUrl?: string | null;
  onFloorChange: (floor: FloorQuad) => void;
  onRugsChange: (rugs: PlacedRug[]) => void;
  onSelect: (id: string | null) => void;
  onToolbar: (pos: { x: number; y: number } | null) => void;
  onReadyCanvas: (canvas: HTMLCanvasElement | null) => void;
  onOccludeClick: (pt: Vec2, add: boolean) => void;
};

const DIV = 20;
const VERT_STRIDE = 4; // x, y, u, v

const VS = `
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_uv = a_uv;
}
`;

const FS_TEX = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform sampler2D u_room;
uniform float u_shade;
uniform float u_alpha;
uniform float u_lightMix;
uniform vec4 u_layout;
uniform vec2 u_css;
uniform float u_dpr;

// Helper for soft light blending
float softLight(float b, float s) {
  return (s < 0.5) ? (2.0 * b * s + b * b * (1.0 - 2.0 * s)) : (sqrt(b) * (2.0 * s - 1.0) + 2.0 * b * (1.0 - s));
}

vec3 softLight(vec3 b, vec3 s) {
  return vec3(softLight(b.r, s.r), softLight(b.g, s.g), softLight(b.b, s.b));
}

void main() {
  vec4 c = texture2D(u_tex, v_uv);
  
  // Calculate distance from edge for softening (0.0 to 1.0)
  float edgeX = min(v_uv.x, 1.0 - v_uv.x);
  float edgeY = min(v_uv.y, 1.0 - v_uv.y);
  float edgeDist = min(edgeX, edgeY);
  
  // Soften the edges slightly to avoid "cut-out" look
  float edgeAlpha = smoothstep(0.0, 0.02, edgeDist);
  
  vec2 cssPt = vec2(gl_FragCoord.x, u_css.y * u_dpr - gl_FragCoord.y) / u_dpr;
  vec2 ruv = (cssPt - u_layout.xy) / u_layout.zw;
  ruv = clamp(ruv, 0.0, 1.0);
  vec3 room = texture2D(u_room, ruv).rgb;
  
  // Extract room luminance and color tint
  float lum = dot(room, vec3(0.299, 0.587, 0.114));
  
  // Realistic lighting: 
  // 1. Multiply by room luminance for basic shadows
  // 2. Use soft light for highlights and ambient color matching
  vec3 lit = c.rgb * mix(vec3(1.0), vec3(0.3 + lum * 1.1), u_lightMix);
  lit = mix(lit, softLight(lit, room), u_lightMix * 0.3);
  
  // 3. Add subtle grain/noise to match room image texture
  float grain = (fract(sin(dot(cssPt, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.035;
  lit += grain * u_lightMix;
  
  gl_FragColor = vec4(lit * u_shade, c.a * u_alpha * edgeAlpha);
}
`;

const FS_OCCLUDE = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_room;
uniform sampler2D u_mask;
void main() {
  float m = texture2D(u_mask, v_uv).r;
  vec3 room = texture2D(u_room, v_uv).rgb;
  gl_FragColor = vec4(room, m);
}
`;

const FS_SOLID = `
precision mediump float;
varying vec2 v_uv;
uniform vec4 u_color;
void main() {
  gl_FragColor = u_color;
}
`;

const FS_ROOM = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
void main() {
  gl_FragColor = texture2D(u_tex, v_uv);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log || "shader compile failed");
  }
  return s;
}

function program(gl: WebGLRenderingContext, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VS));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) || "link failed");
  }
  return p;
}

function pxToClip(x: number, y: number, w: number, h: number): Vec2 {
  return { x: (x / w) * 2 - 1, y: 1 - (y / h) * 2 };
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (/^https?:\/\//i.test(url) && typeof window !== "undefined" && !url.startsWith(window.location.origin)) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed: " + url));
    img.src = url;
    if (img.complete && img.naturalWidth > 0) {
      resolve(img);
    }
  });
}

export default function FloorRugCanvas({
  roomSrc,
  floor,
  floorSize,
  rugs,
  selectedId,
  calibrating,
  tool,
  occlusion,
  occlusionMaskUrl,
  showDebug,
  debugOverlayUrl,
  onFloorChange,
  onRugsChange,
  onSelect,
  onToolbar,
  onReadyCanvas,
  onOccludeClick,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const texProg = useRef<WebGLProgram | null>(null);
  const roomProg = useRef<WebGLProgram | null>(null);
  const solidProg = useRef<WebGLProgram | null>(null);
  const occProg = useRef<WebGLProgram | null>(null);
  const bufRef = useRef<WebGLBuffer | null>(null);
  const maskTex = useRef<WebGLTexture | null>(null);
  const texCache = useRef<Map<string, WebGLTexture>>(new Map());
  const imgCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const layoutRef = useRef<ImageLayout | null>(null);
  const HRef = useRef<number[] | null>(null);
  const invHRef = useRef<number[] | null>(null);
  const dragRef = useRef<
    | { kind: "rug"; id: string; dx: number; dz: number }
    | { kind: "corner"; key: keyof FloorQuad }
    | { kind: "rotate"; id: string; cx: number; cz: number; start: number; base: number }
    | null
  >(null);
  const rugsRef = useRef(rugs);
  const floorRef = useRef(floor);
  const sizeRef = useRef(floorSize);
  const selectedRef = useRef(selectedId);
  const calRef = useRef(calibrating);
  const toolRef = useRef(tool);
  const roomSrcRef = useRef(roomSrc);
  const occRef = useRef(occlusion);
  const [layout, setLayout] = useState<ImageLayout | null>(null);
  const onFloorChangeRef = useRef(onFloorChange);
  const onRugsChangeRef = useRef(onRugsChange);
  const onSelectRef = useRef(onSelect);
  const onToolbarRef = useRef(onToolbar);
  const onReadyCanvasRef = useRef(onReadyCanvas);
  const onOccludeClickRef = useRef(onOccludeClick);
  const lastTbRef = useRef<string>("");
  const lastRhRef = useRef<string>("");
  const [rotHandle, setRotHandle] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    rugsRef.current = rugs;
    floorRef.current = floor;
    sizeRef.current = floorSize;
    selectedRef.current = selectedId;
    calRef.current = calibrating;
    toolRef.current = tool;
    occRef.current = occlusion;
    roomSrcRef.current = roomSrc;
    onFloorChangeRef.current = onFloorChange;
    onRugsChangeRef.current = onRugsChange;
    onSelectRef.current = onSelect;
    onToolbarRef.current = onToolbar;
    onReadyCanvasRef.current = onReadyCanvas;
    onOccludeClickRef.current = onOccludeClick;
  }, [rugs, floor, floorSize, selectedId, calibrating, tool, occlusion, roomSrc, onFloorChange, onRugsChange, onSelect, onToolbar, onReadyCanvas, onOccludeClick]);

  const ensureTex = useCallback(async (gl: WebGLRenderingContext, url: string) => {
    const cached = texCache.current.get(url);
    if (cached) return cached;
    
    let img = imgCache.current.get(url);
    if (!img) {
      try {
        img = await loadImage(url);
        imgCache.current.set(url, img);
      } catch (e) {
        console.error("Failed to load image element:", url, e);
        return null;
      }
    }

    if (glRef.current !== gl) return null;
    const tex = gl.createTexture();
    if (!tex) return null;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
    const isPot = ((img.naturalWidth & (img.naturalWidth - 1)) === 0) &&
                  ((img.naturalHeight & (img.naturalHeight - 1)) === 0);
    if (isPot) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    }
    texCache.current.set(url, tex);
    return tex;
  }, []);

  const projectFloor = useCallback((p: Vec2): Vec2 | null => {
    const H = HRef.current;
    const layout = layoutRef.current;
    if (!H || !layout) return null;
    return imageToCanvas(applyH(H, p), layout);
  }, []);

  const unproject = useCallback((canvasPt: Vec2): Vec2 | null => {
    const inv = invHRef.current;
    const layout = layoutRef.current;
    if (!inv || !layout) return null;
    return applyH(inv, canvasToImage(canvasPt, layout));
  }, []);

  const upload = (data: Float32Array) => {
    const gl = glRef.current;
    const buf = bufRef.current;
    if (!gl || !buf) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STREAM_DRAW);
  };

  const draw = useCallback(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    const texP = texProg.current;
    const roomP = roomProg.current;
    const solP = solidProg.current;
    const occP = occProg.current;
    const buf = bufRef.current;
    if (!gl || !canvas || !texP || !solP || !occP || !buf) return;

    const roomImg = imgCache.current.get(roomSrcRef.current);
    if (!roomImg) {
      console.warn("Room image not in imgCache for draw:", roomSrcRef.current);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW < 2 || cssH < 2) return;
    const pw = Math.round(cssW * dpr);
    const ph = Math.round(cssH * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }

    const layout = coverLayout(cssW, cssH, roomImg.naturalWidth, roomImg.naturalHeight);
    layoutRef.current = layout;
    setLayout((prev) =>
      prev && prev.x === layout.x && prev.y === layout.y && prev.w === layout.w && prev.h === layout.h && prev.canvasW === layout.canvasW && prev.canvasH === layout.canvasH
        ? prev
        : layout
    );
    const H = floorToImageH(floorRef.current, sizeRef.current);
    HRef.current = H;
    invHRef.current = H ? invertH(H) : null;

    gl.viewport(0, 0, pw, ph);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    const bindTexProg = (light = true) => {
      gl.useProgram(texP);
      const aPosTex = gl.getAttribLocation(texP, "a_pos");
      const aUvTex = gl.getAttribLocation(texP, "a_uv");
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPosTex);
      gl.vertexAttribPointer(aPosTex, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(aUvTex);
      gl.vertexAttribPointer(aUvTex, 2, gl.FLOAT, false, 16, 8);
      gl.uniform4f(gl.getUniformLocation(texP, "u_layout"), layout.x, layout.y, layout.w, layout.h);
      gl.uniform2f(gl.getUniformLocation(texP, "u_css"), cssW, cssH);
      gl.uniform1f(gl.getUniformLocation(texP, "u_dpr"), dpr);
      gl.uniform1f(gl.getUniformLocation(texP, "u_lightMix"), light ? 0.62 : 0);
      const rTex = texCache.current.get(roomSrcRef.current);
      if (rTex) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, rTex);
        gl.uniform1i(gl.getUniformLocation(texP, "u_room"), 1);
      }
    };
    const bindSolid = () => {
      gl.useProgram(solP);
      const aPosSol = gl.getAttribLocation(solP, "a_pos");
      const aUvSol = gl.getAttribLocation(solP, "a_uv");
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPosSol);
      gl.vertexAttribPointer(aPosSol, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(aUvSol);
      gl.vertexAttribPointer(aUvSol, 2, gl.FLOAT, false, 16, 8);
    };

    const roomTex = texCache.current.get(roomSrcRef.current);
    if (roomTex && roomP) {
      const tl = pxToClip(layout.x, layout.y, cssW, cssH);
      const tr = pxToClip(layout.x + layout.w, layout.y, cssW, cssH);
      const br = pxToClip(layout.x + layout.w, layout.y + layout.h, cssW, cssH);
      const bl = pxToClip(layout.x, layout.y + layout.h, cssW, cssH);
      
      const verts = new Float32Array([
        tl.x, tl.y, 0, 0,
        tr.x, tr.y, 1, 0,
        bl.x, bl.y, 0, 1,
        tr.x, tr.y, 1, 0,
        br.x, br.y, 1, 1,
        bl.x, bl.y, 0, 1,
      ]);
      
      upload(verts);
      gl.useProgram(roomP);
      const aPos = gl.getAttribLocation(roomP, "a_pos");
      const aUv = gl.getAttribLocation(roomP, "a_uv");
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(aUv);
      gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, roomTex);
      gl.uniform1i(gl.getUniformLocation(roomP, "u_tex"), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    const pushGrid = () => {
      if (!H) return;
      const lines: number[] = [];
      const addSeg = (a: Vec2, b: Vec2) => {
        const pa = projectFloor(a);
        const pb = projectFloor(b);
        if (!pa || !pb) return;
        const ca = pxToClip(pa.x, pa.y, cssW, cssH);
        const cb = pxToClip(pb.x, pb.y, cssW, cssH);
        lines.push(ca.x, ca.y, 0, 0, cb.x, cb.y, 0, 0);
      };
      const { widthFt, depthFt } = sizeRef.current;
      for (let x = 0; x <= widthFt + 0.01; x += 1) addSeg({ x, y: 0 }, { x, y: depthFt });
      for (let z = 0; z <= depthFt + 0.01; z += 1) addSeg({ x: 0, y: z }, { x: widthFt, y: z });
      if (!lines.length) return;
      upload(new Float32Array(lines));
      bindSolid();
      const alpha = calRef.current ? 0.28 : 0.08;
      gl.uniform4f(gl.getUniformLocation(solP, "u_color"), 1, 1, 1, alpha);
      gl.drawArrays(gl.LINES, 0, lines.length / 4);
    };
    pushGrid();

    const tessellate = (cornersFloor: Vec2[], expand = 0, offsetZ = 0) => {
      if (!H) return null;
      const verts: number[] = [];
      const pts: Vec2[][] = [];
      for (let j = 0; j <= DIV; j++) {
        const row: Vec2[] = [];
        const v = j / DIV;
        for (let i = 0; i <= DIV; i++) {
          const u = i / DIV;
          const a = 1 - u;
          const b = 1 - v;
          // bilinear in floor space, then homography → perspective
          const p = {
            x: cornersFloor[0].x * a * b + cornersFloor[1].x * u * b + cornersFloor[2].x * u * v + cornersFloor[3].x * a * v,
            y: cornersFloor[0].y * a * b + cornersFloor[1].y * u * b + cornersFloor[2].y * u * v + cornersFloor[3].y * a * v,
          };
          
          if (offsetZ) {
            p.y += offsetZ; // Offset along the floor depth
          }

          if (expand) {
            const c = {
              x: (cornersFloor[0].x + cornersFloor[1].x + cornersFloor[2].x + cornersFloor[3].x) / 4,
              y: (cornersFloor[0].y + cornersFloor[1].y + cornersFloor[2].y + cornersFloor[3].y) / 4,
            };
            p.x = c.x + (p.x - c.x) * (1 + expand);
            p.y = c.y + (p.y - c.y) * (1 + expand);
          }
          const scr = projectFloor(p);
          if (!scr) return null;
          row.push(pxToClip(scr.x, scr.y, cssW, cssH));
        }
        pts.push(row);
      }
      for (let j = 0; j < DIV; j++) {
        for (let i = 0; i < DIV; i++) {
          const u0 = i / DIV, u1 = (i + 1) / DIV;
          const v0 = j / DIV, v1 = (j + 1) / DIV;
          const a = pts[j][i], b = pts[j][i + 1], c = pts[j + 1][i + 1], d = pts[j + 1][i];
          verts.push(
            a.x, a.y, u0, v0,
            b.x, b.y, u1, v0,
            d.x, d.y, u0, v1,
            b.x, b.y, u1, v0,
            c.x, c.y, u1, v1,
            d.x, d.y, u0, v1
          );
        }
      }
      return new Float32Array(verts);
    };

    for (const rug of rugsRef.current) {
      const corners = rugFloorCorners(rug);
      const zNorm = Math.min(1, Math.max(0, rug.z / sizeRef.current.depthFt));
      const shade = 1 - zNorm * 0.22;
      
      // Realistic Soft Contact Shadow (thin, tight under rug perimeter with no harsh gray box)
      const conShadow = tessellate(corners, 0.015, 0.02);
      if (conShadow) {
        upload(conShadow);
        bindSolid();
        gl.uniform4f(gl.getUniformLocation(solP, "u_color"), 0.02, 0.02, 0.02, 0.25);
        gl.drawArrays(gl.TRIANGLES, 0, conShadow.length / VERT_STRIDE);
      }

      const mesh = tessellate(corners);
      const tex = texCache.current.get(rug.img);
      if (mesh && tex) {
        upload(mesh);
        bindTexProg(true);
        gl.uniform1f(gl.getUniformLocation(texP, "u_shade"), shade);
        gl.uniform1f(gl.getUniformLocation(texP, "u_alpha"), 0.98);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(gl.getUniformLocation(texP, "u_tex"), 0);
        gl.drawArrays(gl.TRIANGLES, 0, mesh.length / VERT_STRIDE);
      }
      if (rug.instanceId === selectedRef.current) {
        const outline: number[] = [];
        for (let i = 0; i < 4; i++) {
          const a = projectFloor(corners[i]);
          const b = projectFloor(corners[(i + 1) % 4]);
          if (!a || !b) continue;
          const ca = pxToClip(a.x, a.y, cssW, cssH);
          const cb = pxToClip(b.x, b.y, cssW, cssH);
          outline.push(ca.x, ca.y, 0, 0, cb.x, cb.y, 0, 0);
        }
        if (outline.length) {
          upload(new Float32Array(outline));
          bindSolid();
          gl.uniform4f(gl.getUniformLocation(solP, "u_color"), 0.48, 0.05, 0.07, 0.9);
          gl.drawArrays(gl.LINES, 0, outline.length / 4);
        }
        const scr = corners.map((c) => projectFloor(c)).filter(Boolean) as Vec2[];
        if (scr.length === 4) {
          const cen = polygonCentroid(scr);
          const next = { x: cen.x, y: Math.max(...scr.map((p) => p.y)) + 14 };
          const key = `${selectedRef.current}:${next.x.toFixed(1)}:${next.y.toFixed(1)}`;
          if (lastTbRef.current !== key) {
            lastTbRef.current = key;
            onToolbarRef.current(next);
          }
          const top = scr.reduce((a, p) => (p.y < a.y ? p : a), scr[0]);
          const rh = { x: top.x, y: top.y - 22 };
          const rhKey = `${rh.x.toFixed(0)}:${rh.y.toFixed(0)}`;
          if (lastRhRef.current !== rhKey) {
            lastRhRef.current = rhKey;
            setRotHandle(rh);
          }
        }
      }
    }

    const mask = (occlusionMaskUrl ? texCache.current.get(occlusionMaskUrl) : null) || maskTex.current;
    const roomTex2 = texCache.current.get(roomSrcRef.current);
    if (mask && roomTex2 && (occlusionMaskUrl || occRef.current)) {
      const tl = pxToClip(layout.x, layout.y, cssW, cssH);
      const tr = pxToClip(layout.x + layout.w, layout.y, cssW, cssH);
      const br = pxToClip(layout.x + layout.w, layout.y + layout.h, cssW, cssH);
      const bl = pxToClip(layout.x, layout.y + layout.h, cssW, cssH);
      upload(new Float32Array([
        tl.x, tl.y, 0, 0,
        tr.x, tr.y, 1, 0,
        bl.x, bl.y, 0, 1,
        tr.x, tr.y, 1, 0,
        br.x, br.y, 1, 1,
        bl.x, bl.y, 0, 1,
      ]));
      gl.useProgram(occP);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      const aPosO = gl.getAttribLocation(occP, "a_pos");
      const aUvO = gl.getAttribLocation(occP, "a_uv");
      gl.enableVertexAttribArray(aPosO);
      gl.vertexAttribPointer(aPosO, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(aUvO);
      gl.vertexAttribPointer(aUvO, 2, gl.FLOAT, false, 16, 8);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, roomTex2);
      gl.uniform1i(gl.getUniformLocation(occP, "u_room"), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, mask);
      gl.uniform1i(gl.getUniformLocation(occP, "u_mask"), 1);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    if (!selectedRef.current && lastTbRef.current !== "") {
      lastTbRef.current = "";
      onToolbarRef.current(null);
      lastRhRef.current = "";
      setRotHandle(null);
    }
  }, [projectFloor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { 
      preserveDrawingBuffer: true, 
      antialias: true,
      alpha: true,
      premultipliedAlpha: false
    });
    if (!gl) return;
    glRef.current = gl;
    texProg.current = program(gl, FS_TEX);
    roomProg.current = program(gl, FS_ROOM);
    solidProg.current = program(gl, FS_SOLID);
    occProg.current = program(gl, FS_OCCLUDE);
    bufRef.current = gl.createBuffer();
    onReadyCanvasRef.current(canvas);
    
    // Initial draw to ensure clear state
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return () => {
      texCache.current.forEach((t) => gl.deleteTexture(t));
      texCache.current.clear();
      if (bufRef.current) gl.deleteBuffer(bufRef.current);
      if (texProg.current) gl.deleteProgram(texProg.current);
      if (solidProg.current) gl.deleteProgram(solidProg.current);
      if (occProg.current) gl.deleteProgram(occProg.current);
      if (maskTex.current) gl.deleteTexture(maskTex.current);
      glRef.current = null;
      onReadyCanvasRef.current(null);
    };
  }, []);

  const rugUrls = rugs.map((r) => r.img).join("|");
  const maskUrl = occlusionMaskUrl || "";

  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;
    let cancelled = false;
    (async () => {
      try {
        await ensureTex(gl, roomSrc);
        if (maskUrl) {
          await ensureTex(gl, maskUrl);
        }
        for (const url of rugUrls.split("|")) {
          if (url) {
            await ensureTex(gl, url);
          }
        }
        if (!cancelled) {
          draw();
        }
      } catch (e) {
        console.error("Texture loading error:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [roomSrc, rugUrls, maskUrl, ensureTex, draw]);

  useEffect(() => {
    occRef.current = occlusion;
    const gl = glRef.current;
    if (!gl) return;
    if (!occlusion) {
      maskTex.current = null;
      draw();
      return;
    }
    if (!maskTex.current) maskTex.current = gl.createTexture();
    const tex = maskTex.current;
    if (!tex) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, occlusion.width, occlusion.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, occlusion.data);
    draw();
  }, [occlusion, draw]);

  useEffect(() => {
    draw();
  }, [floor, floorSize, rugs, selectedId, calibrating, draw]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw]);

  const localPoint = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const hitCorner = (pt: Vec2): keyof FloorQuad | null => {
    if (!calRef.current) return null;
    const keys: (keyof FloorQuad)[] = ["nearLeft", "nearRight", "farRight", "farLeft"];
    const layout = layoutRef.current;
    if (!layout) return null;
    for (const k of keys) {
      const p = imageToCanvas(floorRef.current[k], layout);
      const dx = p.x - pt.x;
      const dy = p.y - pt.y;
      if (dx * dx + dy * dy < 18 * 18) return k;
    }
    return null;
  };

  const hitRug = (floorPt: Vec2): PlacedRug | null => {
    for (let i = rugsRef.current.length - 1; i >= 0; i--) {
      const rug = rugsRef.current[i];
      if (pointInPolygon(floorPt, rugFloorCorners(rug))) return rug;
    }
    return null;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pt = localPoint(e);
    const corner = hitCorner(pt);
    if (corner) {
      dragRef.current = { kind: "corner", key: corner };
      return;
    }
    const layout = layoutRef.current;
    if (toolRef.current !== "move" && layout) {
      const img = canvasToImage(pt, layout);
      onOccludeClickRef.current(img, toolRef.current === "under");
      return;
    }
    const floorPt = unproject(pt);
    if (!floorPt) {
      onSelectRef.current(null);
      return;
    }
    const rug = hitRug(floorPt);
    if (rug) {
      onSelectRef.current(rug.instanceId);
      dragRef.current = { kind: "rug", id: rug.instanceId, dx: rug.x - floorPt.x, dz: rug.z - floorPt.y };
    } else {
      onSelectRef.current(null);
      dragRef.current = null;
    }
  };

  const beginRotate = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const rug = rugsRef.current.find((r) => r.instanceId === selectedRef.current);
    if (!rug) return;
    const pt = localPoint(e);
    const floorPt = unproject(pt);
    if (!floorPt) return;
    dragRef.current = {
      kind: "rotate",
      id: rug.instanceId,
      cx: rug.x,
      cz: rug.z,
      start: Math.atan2(floorPt.y - rug.z, floorPt.x - rug.x),
      base: rug.rot,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const pt = localPoint(e);
    if (drag.kind === "corner") {
      const layout = layoutRef.current;
      if (!layout) return;
      const img = canvasToImage(pt, layout);
      onFloorChangeRef.current({ ...floorRef.current, [drag.key]: { x: img.x, y: img.y } });
      return;
    }
    const floorPt = unproject(pt);
    if (!floorPt) return;
    if (drag.kind === "rotate") {
      const ang = Math.atan2(floorPt.y - drag.cz, floorPt.x - drag.cx);
      const rot = drag.base + (ang - drag.start);
      onRugsChangeRef.current(
        rugsRef.current.map((r) => (r.instanceId === drag.id ? { ...r, rot } : r))
      );
    } else if (drag.kind === "rug") {
      onRugsChangeRef.current(
        rugsRef.current.map((r) =>
          r.instanceId === drag.id
            ? {
                ...r,
                x: Math.min(sizeRef.current.widthFt - 0.3, Math.max(0.3, floorPt.x + drag.dx)),
                z: Math.min(sizeRef.current.depthFt - 0.3, Math.max(0.3, floorPt.y + drag.dz)),
              }
            : r
        )
      );
    }
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const handles = (["nearLeft", "nearRight", "farRight", "farLeft"] as const).map((key) => {
    if (!layout) return { key, x: 0, y: 0 };
    const p = imageToCanvas(floor[key], layout);
    return { key, x: p.x, y: p.y };
  });

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-[#0d0d0d]">
      {layout && (
        <img
          src={roomSrc}
          alt="Room space"
          className="absolute pointer-events-none select-none"
          style={{
            left: `${layout.x}px`,
            top: `${layout.y}px`,
            width: `${layout.w}px`,
            height: `${layout.h}px`,
            maxWidth: "none",
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full touch-none ${
          tool === "move" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      {calibrating && layout && handles.map((h) => (
        <div
          key={h.key}
          className="absolute z-20 w-4 h-4 -ml-2 -mt-2 rounded-full bg-white border-2 border-[#7A0C13] pointer-events-none"
          style={{ left: h.x, top: h.y }}
        />
      ))}
      {showDebug && debugOverlayUrl && layout && (
        <img
          src={debugOverlayUrl}
          alt="AI Vision Debug"
          className="absolute z-10 pointer-events-none opacity-50 select-none mix-blend-screen"
          style={{
            left: `${layout.x}px`,
            top: `${layout.y}px`,
            width: `${layout.w}px`,
            height: `${layout.h}px`,
            maxWidth: "none",
          }}
        />
      )}
      {rotHandle && selectedId && tool === "move" && !calibrating && (
        <button
          type="button"
          aria-label="Rotate rug"
          className="absolute z-20 w-7 h-7 -ml-3.5 -mt-3.5 rounded-full bg-white text-black flex items-center justify-center border border-black/20 cursor-grab active:cursor-grabbing"
          style={{ left: rotHandle.x, top: rotHandle.y }}
          onPointerDown={beginRotate}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <RotateCw size={13} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
}

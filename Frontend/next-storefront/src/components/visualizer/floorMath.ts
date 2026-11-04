export type Vec2 = { x: number; y: number };

/** Floor quad in normalized image coordinates (origin top-left, y down). */
export type FloorQuad = {
  nearLeft: Vec2;
  nearRight: Vec2;
  farRight: Vec2;
  farLeft: Vec2;
};

export type FloorSize = { widthFt: number; depthFt: number };

export type ImageLayout = {
  x: number;
  y: number;
  w: number;
  h: number;
  canvasW: number;
  canvasH: number;
};

export type PlacedRug = {
  instanceId: string;
  productId: string;
  name: string;
  img: string;
  w: number;
  h: number;
  x: number;
  z: number;
  rot: number;
};

export function defaultFloorQuad(): FloorQuad {
  return {
    farLeft: { x: 0.22, y: 0.54 },
    farRight: { x: 0.78, y: 0.54 },
    nearRight: { x: 0.97, y: 0.93 },
    nearLeft: { x: 0.03, y: 0.93 },
  };
}

export function coverLayout(
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number
): ImageLayout {
  const s = Math.max(canvasW / imgW, canvasH / imgH);
  const w = imgW * s;
  const h = imgH * s;
  return {
    x: (canvasW - w) / 2,
    y: (canvasH - h) / 2,
    w,
    h,
    canvasW,
    canvasH,
  };
}

export function imageToCanvas(p: Vec2, layout: ImageLayout): Vec2 {
  return { x: layout.x + p.x * layout.w, y: layout.y + p.y * layout.h };
}

export function canvasToImage(p: Vec2, layout: ImageLayout): Vec2 {
  return {
    x: (p.x - layout.x) / layout.w,
    y: (p.y - layout.y) / layout.h,
  };
}

function solve(A: number[][], b: number[]): number[] | null {
  const n = b.length;
  const M = A.map((row, i) => row.concat(b[i]));
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    if (Math.abs(M[pivot][col]) < 1e-10) return null;
    if (pivot !== col) {
      const tmp = M[col];
      M[col] = M[pivot];
      M[pivot] = tmp;
    }
    const div = M[col][col];
    for (let j = col; j <= n; j++) M[col][j] /= div;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      if (f === 0) continue;
      for (let j = col; j <= n; j++) M[r][j] -= f * M[col][j];
    }
  }
  return M.map((row) => row[n]);
}

/** 3x3 row-major homography mapping src → dst. */
export function findHomography(src: Vec2[], dst: Vec2[]): number[] | null {
  if (src.length !== 4 || dst.length !== 4) return null;
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const { x, y } = src[i];
    const u = dst[i].x;
    const v = dst[i].y;
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    b.push(v);
  }
  const h = solve(A, b);
  if (!h) return null;
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}

export function applyH(H: number[], p: Vec2): Vec2 {
  const x = H[0] * p.x + H[1] * p.y + H[2];
  const y = H[3] * p.x + H[4] * p.y + H[5];
  const w = H[6] * p.x + H[7] * p.y + H[8];
  if (Math.abs(w) < 1e-12) return { x: 0, y: 0 };
  return { x: x / w, y: y / w };
}

export function invertH(H: number[]): number[] | null {
  const [a, b, c, d, e, f, g, h, i] = H;
  const C00 = e * i - f * h;
  const C01 = f * g - d * i;
  const C02 = d * h - e * g;
  const C10 = c * h - b * i;
  const C11 = a * i - c * g;
  const C12 = b * g - a * h;
  const C20 = b * f - c * e;
  const C21 = c * d - a * f;
  const C22 = a * e - b * d;
  const det = a * C00 + b * C01 + c * C02;
  if (Math.abs(det) < 1e-12) return null;
  return [
    C00 / det, C10 / det, C20 / det,
    C01 / det, C11 / det, C21 / det,
    C02 / det, C12 / det, C22 / det,
  ];
}

/**
 * Maps floor feet (x along width, z toward the back wall)
 * onto normalized image coordinates.
 * (0,0) = near-left, (width,0) = near-right, (width,depth) = far-right.
 */
export function floorToImageH(quad: FloorQuad, size: FloorSize): number[] | null {
  return findHomography(
    [
      { x: 0, y: 0 },
      { x: size.widthFt, y: 0 },
      { x: size.widthFt, y: size.depthFt },
      { x: 0, y: size.depthFt },
    ],
    [quad.nearLeft, quad.nearRight, quad.farRight, quad.farLeft]
  );
}

export function rotate2(p: Vec2, ang: number): Vec2 {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
}

export function rugFloorCorners(rug: PlacedRug): Vec2[] {
  const hw = rug.w / 2;
  const hh = rug.h / 2;
  const local = [
    { x: -hw, y: -hh },
    { x: hw, y: -hh },
    { x: hw, y: hh },
    { x: -hw, y: hh },
  ];
  return local.map((p) => {
    const r = rotate2(p, rug.rot);
    return { x: r.x + rug.x, y: r.y + rug.z };
  });
}

export function pointInPolygon(p: Vec2, poly: Vec2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    const hit =
      yi > p.y !== yj > p.y &&
      p.x < ((xj - xi) * (p.y - yi)) / (yj - yi + 1e-12) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

export function polygonCentroid(poly: Vec2[]): Vec2 {
  let x = 0, y = 0;
  for (const p of poly) {
    x += p.x;
    y += p.y;
  }
  const n = poly.length || 1;
  return { x: x / n, y: y / n };
}

export function clampRug(rug: PlacedRug, size: FloorSize): PlacedRug {
  const pad = 0.2;
  return {
    ...rug,
    x: Math.min(size.widthFt - pad, Math.max(pad, rug.x)),
    z: Math.min(size.depthFt - pad, Math.max(pad, rug.z)),
  };
}

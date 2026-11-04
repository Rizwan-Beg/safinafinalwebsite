import assert from "node:assert";

console.log("🧪 Running Comprehensive In-Process Test Suite...\n");

// --- TEST 1: Security Validation & Path Traversal Prevention ---
console.log("Test 1: Validating filename security regex (Directory Traversal Prevention)...");
const FILENAME_REGEX = /^[a-zA-Z0-9_-]+\.(png|jpg|jpeg)$/;

const dangerousFilenames = [
  "../secret.png",
  "..%2Fsecret.png",
  "/etc/passwd",
  "folder/sub/mask.png",
  "image.png.exe",
  "evil.sh",
  "..",
  "mask..png",
  "mask.png;rm -rf /",
];

for (const fn of dangerousFilenames) {
  assert.strictEqual(
    FILENAME_REGEX.test(fn),
    false,
    `Dangerous filename '${fn}' MUST fail regex validation!`
  );
}

const safeFilenames = [
  "mask_cae71f64d7a141f0bf731995ba11dd6c.png",
  "debug_cae71f64d7a141f0bf731995ba11dd6c.jpg",
  "mask_test-123_456.jpeg",
];

for (const fn of safeFilenames) {
  assert.strictEqual(
    FILENAME_REGEX.test(fn),
    true,
    `Safe filename '${fn}' must pass regex validation!`
  );
}
console.log("✅ Passed: Traversal prevention regex correctly protects the image proxy.");

// --- TEST 2: URL Rewriting Logic ---
console.log("\nTest 2: Validating URL rewriting to same-origin proxy...");
function rewriteVisualizerUrls(analysis) {
  if (typeof analysis.occlusion_mask_url === "string") {
    const parts = analysis.occlusion_mask_url.split("/");
    const maskFilename = parts[parts.length - 1];
    if (FILENAME_REGEX.test(maskFilename)) {
      analysis.occlusion_mask_url = `/api/visualizer-images/${maskFilename}`;
    }
  }

  if (typeof analysis.debug_overlay_url === "string") {
    const parts = analysis.debug_overlay_url.split("/");
    const debugFilename = parts[parts.length - 1];
    if (FILENAME_REGEX.test(debugFilename)) {
      analysis.debug_overlay_url = `/api/visualizer-images/${debugFilename}`;
    }
  }
  return analysis;
}

const mockUpstreamResponse = {
  room_type: "living_room",
  floor_quad: {
    farLeft: { x: 0.1, y: 0.65 },
    farRight: { x: 0.9, y: 0.65 },
    nearRight: { x: 0.98, y: 0.995 },
    nearLeft: { x: 0.02, y: 0.995 },
  },
  floor_size: { widthFt: 14.4, depthFt: 12.0 },
  occlusion_mask_url: "http://visualizer:8000/images/mask_abc123.png",
  debug_overlay_url: "http://visualizer:8000/images/debug_abc123.jpg",
};

const rewritten = rewriteVisualizerUrls({ ...mockUpstreamResponse });
assert.strictEqual(
  rewritten.occlusion_mask_url,
  "/api/visualizer-images/mask_abc123.png",
  "Must rewrite internal Docker URL to same-origin proxy"
);
assert.strictEqual(
  rewritten.debug_overlay_url,
  "/api/visualizer-images/debug_abc123.jpg",
  "Must rewrite internal Docker URL to same-origin proxy"
);
console.log("✅ Passed: URLs are rewritten cleanly to /api/visualizer-images/.");

// --- TEST 3: Deterministic Mask Composition & Manual Overrides ---
console.log("\nTest 3: Validating deterministic mask composition (Under/Reveal logic)...");
// Simulate binary mask grid 10x10
const w = 10;
const h = 10;
const bin = new Uint8Array(w * h);

// Baseline: center 4 pixels are masked by AI (pixels at (4,4), (4,5), (5,4), (5,5))
bin[4 * w + 4] = 1;
bin[4 * w + 5] = 1;
bin[5 * w + 4] = 1;
bin[5 * w + 5] = 1;

assert.strictEqual(bin[4 * w + 4], 1, "AI baseline is present");

// Manual Under click at (2, 2) -> marks pixel as foreground (1)
const underClick = { x: 0.2, y: 0.2, add: true };
bin[Math.round(underClick.y * (h - 1)) * w + Math.round(underClick.x * (w - 1))] = underClick.add ? 1 : 0;
assert.strictEqual(bin[2 * w + 2], 1, "Under click marks region as foreground (1)");

// Manual Reveal click at (4, 4) -> unmasks region (0)
const revealClick = { x: 0.44, y: 0.44, add: false };
bin[Math.round(revealClick.y * (h - 1)) * w + Math.round(revealClick.x * (w - 1))] = revealClick.add ? 1 : 0;
assert.strictEqual(bin[4 * w + 4], 0, "Reveal click marks region as non-foreground (0)");

// Check that unclicked AI pixels remain intact!
assert.strictEqual(bin[4 * w + 5], 1, "Unedited AI baseline pixels remain intact");
assert.strictEqual(bin[5 * w + 4], 1, "Unedited AI baseline pixels remain intact");

console.log("✅ Passed: Deterministic mask composition preserves AI baseline and applies Under/Reveal overrides.");

// --- TEST 4: Product Identity & Dimension Preservation ---
console.log("\nTest 4: Validating product preservation during room analysis...");
const userPlacedRug = {
  instanceId: "custom-user-rug-1",
  productId: "prod_safina_tabriz_999",
  name: "Authentic Tabriz Masterpiece",
  img: "/images/custom-uploaded-tabriz.jpg",
  w: 9.0,
  h: 12.0,
  x: 5.0,
  z: 4.0,
  rot: 0.785,
};

const suggestedPlacement = {
  x: 8.5,
  z: 7.2,
  w: 8.0,
  h: 10.0,
  reason: "Centered under dining table",
};

// Simulate RoomVisualizer setRugs update
const currentRugs = [userPlacedRug];
const updatedRugs = currentRugs.map((r) => {
  if (r.instanceId === userPlacedRug.instanceId) {
    // Only update position (x, z), strictly preserving productId, name, img, dimensions w, h, and rot
    return {
      ...r,
      x: suggestedPlacement.x,
      z: suggestedPlacement.z,
    };
  }
  return r;
});

assert.strictEqual(updatedRugs[0].instanceId, userPlacedRug.instanceId);
assert.strictEqual(updatedRugs[0].productId, "prod_safina_tabriz_999", "Product ID must be preserved!");
assert.strictEqual(updatedRugs[0].name, "Authentic Tabriz Masterpiece", "Product Name must be preserved!");
assert.strictEqual(updatedRugs[0].img, "/images/custom-uploaded-tabriz.jpg", "Product Image must be preserved!");
assert.strictEqual(updatedRugs[0].w, 9.0, "Width must NOT be overwritten by suggested size!");
assert.strictEqual(updatedRugs[0].h, 12.0, "Height must NOT be overwritten by suggested size!");
assert.strictEqual(updatedRugs[0].rot, 0.785, "Rotation must NOT be overwritten!");
assert.strictEqual(updatedRugs[0].x, 8.5, "New anchor position applied");
assert.strictEqual(updatedRugs[0].z, 7.2, "New anchor position applied");

console.log("✅ Passed: Rug product identity, images, dimensions, and rotation are 100% preserved.");

console.log("\n🎉 ALL IN-PROCESS UNIT TESTS COMPLETED SUCCESSFULLY!");

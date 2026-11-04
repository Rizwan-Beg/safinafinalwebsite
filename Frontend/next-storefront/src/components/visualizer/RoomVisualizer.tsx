"use client";

import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  RotateCw, Trash2, Download, Home, Search, UploadCloud, X,
  Ruler, ArrowRight, Copy, Grid3x3, MousePointer2, EyeOff, Eraser,
  Sparkles, Eye, Loader2
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { Product } from "@/types";
import FloorRugCanvas, { type PointerTool } from "./FloorRugCanvas";
import {
  clampRug,
  defaultFloorQuad,
  type FloorQuad,
  type FloorSize,
  type PlacedRug,
} from "./floorMath";
import { buildOcclusionMask, loadRoomImage, type OccludeClick } from "./occlusionMask";

import sampleRoom1 from "@/assets/visualizer/sample-room-1.jpg";
import sampleRoom2 from "@/assets/visualizer/sample-room-2.jpg";
import sampleRoom3 from "@/assets/visualizer/sample-room-3.jpg";
import sampleRoom4 from "@/assets/visualizer/sample-room-4.jpg";
import rugroom from "@/assets/visualizer/rugroom.jpg";
import rugroom2 from "@/assets/visualizer/rugroom2.jpg";
import rugroom3 from "@/assets/visualizer/rugroom3.jpg";
import rugroom4 from "@/assets/visualizer/rugroom4.jpg";
import rugroom6 from "@/assets/visualizer/rugroom6.jpg";

import { mockProducts } from "@/data/mockData";

type Room = { name: string; src: string; floor: FloorQuad; floorSize: FloorSize };

const ROOMS: Room[] = [
  {
    name: "Modern Living Room",
    src: sampleRoom1.src,
    floor: { farLeft: { x: 0.09, y: 0.605 }, farRight: { x: 0.94, y: 0.605 }, nearRight: { x: 1, y: 0.995 }, nearLeft: { x: 0, y: 0.995 } },
    floorSize: { widthFt: 16, depthFt: 14 },
  },
  {
    name: "Cozy Bedroom",
    src: sampleRoom2.src,
    floor: { farLeft: { x: 0.05, y: 0.70 }, farRight: { x: 0.93, y: 0.70 }, nearRight: { x: 0.99, y: 0.995 }, nearLeft: { x: 0.01, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
  {
    name: "Elegant Dining",
    src: sampleRoom3.src,
    floor: { farLeft: { x: 0.10, y: 0.66 }, farRight: { x: 0.90, y: 0.68 }, nearRight: { x: 1, y: 0.995 }, nearLeft: { x: 0, y: 0.995 } },
    floorSize: { widthFt: 16, depthFt: 18 },
  },
  {
    name: "Open Hall",
    src: sampleRoom4.src,
    floor: { farLeft: { x: 0.20, y: 0.71 }, farRight: { x: 0.82, y: 0.71 }, nearRight: { x: 0.97, y: 0.995 }, nearLeft: { x: 0.12, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
  {
    name: "Classic Nook",
    src: rugroom.src,
    floor: { farLeft: { x: 0.05, y: 0.68 }, farRight: { x: 0.95, y: 0.68 }, nearRight: { x: 1, y: 0.995 }, nearLeft: { x: 0, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
  {
    name: "Study Room",
    src: rugroom2.src,
    floor: { farLeft: { x: 0.08, y: 0.735 }, farRight: { x: 0.92, y: 0.735 }, nearRight: { x: 0.99, y: 0.995 }, nearLeft: { x: 0.01, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
  {
    name: "Bright Entry",
    src: rugroom3.src,
    floor: { farLeft: { x: 0.15, y: 0.70 }, farRight: { x: 0.85, y: 0.70 }, nearRight: { x: 0.98, y: 0.995 }, nearLeft: { x: 0.02, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
  {
    name: "Minimalist Lounge",
    src: rugroom4.src,
    floor: { farLeft: { x: 0.10, y: 0.68 }, farRight: { x: 0.90, y: 0.68 }, nearRight: { x: 0.98, y: 0.995 }, nearLeft: { x: 0.02, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
  {
    name: "Sunlit Den",
    src: rugroom6.src,
    floor: { farLeft: { x: 0.12, y: 0.71 }, farRight: { x: 0.88, y: 0.71 }, nearRight: { x: 0.98, y: 0.995 }, nearLeft: { x: 0.02, y: 0.995 } },
    floorSize: { widthFt: 14, depthFt: 16 },
  },
];

const SIZES = [
  { label: "2 x 3 ft", w: 2, h: 3 },
  { label: "3 x 5 ft", w: 3, h: 5 },
  { label: "4 x 6 ft", w: 4, h: 6 },
  { label: "5 x 7 ft", w: 5, h: 7 },
  { label: "5 x 8 ft", w: 5, h: 8 },
  { label: "6 x 9 ft", w: 6, h: 9 },
  { label: "8 x 10 ft", w: 8, h: 10 },
  { label: "9 x 12 ft", w: 9, h: 12 },
  { label: "10 x 14 ft", w: 10, h: 14 },
];

const T = {
  style: {
    borderRadius: "0px",
    background: "#000",
    color: "#fff",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    padding: "14px 20px",
  },
};

function parseSize(p: any): { w: number; h: number } | null {
  for (const s of [p.category, p.size, p.metadata?.size, p.metadata?.dimensions]) {
    if (!s) continue;
    const m = String(s).match(/(\d+(?:\.\d+)?)\s*[xX×]\s*(\d+(?:\.\d+)?)/);
    if (m) return { w: +m[1], h: +m[2] };
  }
  return null;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const OPTIMIZED_RUGS = [
  { id: "rug-kashan", name: "Kashan Royal Medallion", images: ["/images/rug-kashan.jpg"], category: "Persian", size: "8x10 ft", price: 8500, metadata: { size: "8x10 ft", material: "Wool & Silk" } },
  { id: "rug-tabriz", name: "Tabriz Garden of Paradise", images: ["/images/rug-tabriz.jpg"], category: "Silk", size: "8x10 ft", price: 12000, metadata: { size: "8x10 ft", material: "Pure Silk" } },
  { id: "rug-heriz", name: "Heriz Imperial Medallion", images: ["/images/rug-heriz.jpg"], category: "Tribal", size: "6x9 ft", price: 6800, metadata: { size: "6x9 ft", material: "Organic Wool" } },
  { id: "rug-nain", name: "Nain Celestial Blue", images: ["/images/rug-nain.jpg"], category: "Silk", size: "8x10 ft", price: 15000, metadata: { size: "8x10 ft", material: "High-Knot Silk" } },
  { id: "rug-gabbeh", name: "Gabbeh Earth Tales", images: ["/images/rug-gabbeh.jpg"], category: "Tribal", size: "5x8 ft", price: 4200, metadata: { size: "5x8 ft", material: "Hand-Spun Wool" } },
  { id: "rug-isfahan", name: "Isfahan Shah Abbas", images: ["/images/rug-isfahan.jpg"], category: "Classic", size: "9x12 ft", price: 22000, metadata: { size: "9x12 ft", material: "Silk & Gold Thread" } },
  { id: "rug-kerman", name: "Kerman Rose Garden", images: ["/images/rug-kerman.jpg"], category: "Classic", size: "6x9 ft", price: 7800, metadata: { size: "6x9 ft", material: "Fine Wool" } },
  { id: "rug-qum", name: "Qum Silk Prayer", images: ["/images/rug-qum.jpg"], category: "Silk", size: "4x6 ft", price: 18500, metadata: { size: "4x6 ft", material: "Masterpiece Silk" } },
  { id: "rug-mashad", name: "Mashad Grand Medallion", images: ["/images/rug-mashad.jpg"], category: "Vintage", size: "8x10 ft", price: 9500, metadata: { size: "8x10 ft", material: "Vintage Wool" } },
  { id: "rug-photo-1", name: "Safina Signature Artisan Silk", images: ["/images/rug-photoroom-1.jpg"], category: "Signature", size: "8x10 ft", price: 14000, metadata: { size: "8x10 ft", material: "Artisan Silk" } },
  { id: "rug-photo-2", name: "Vintage Floral Crimson", images: ["/images/rug-photoroom-2.jpg"], category: "Vintage", size: "6x9 ft", price: 9200, metadata: { size: "6x9 ft", material: "Hand-Knotted Wool" } },
  { id: "rug-photo-3", name: "Imperial Diamond Border", images: ["/images/rug-photoroom-3.jpg"], category: "Heritage", size: "8x10 ft", price: 11500, metadata: { size: "8x10 ft", material: "Natural Wool" } },
];

export default function RoomVisualizer() {
  const [step, setStep] = useState<"room" | "canvas">("room");
  const [room, setRoom] = useState<Room | null>(null);
  const [products, setProducts] = useState<any[]>(OPTIMIZED_RUGS);
  const [query, setQuery] = useState("");
  const [rugs, setRugs] = useState<PlacedRug[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sizeIdx, setSizeIdx] = useState(5);
  const [tb, setTb] = useState<{ x: number; y: number } | null>(null);
  const [roomModal, setRoomModal] = useState(false);
  const [calibrating, setCalibrating] = useState(false);
  const [floor, setFloor] = useState<FloorQuad>(defaultFloorQuad());
  const [floorSize, setFloorSize] = useState<FloorSize>({ widthFt: 14, depthFt: 18 });
  const [tool, setTool] = useState<PointerTool>("move");
  const [occlusion, setOcclusion] = useState<ImageData | null>(null);
  const [occludeClicks, setOccludeClicks] = useState<OccludeClick[]>([]);
  const [autoOcclude, setAutoOcclude] = useState(true);
  const [maskBusy, setMaskBusy] = useState(false);
  const roomImgRef = useRef<HTMLImageElement | null>(null);
  const maskTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // AI Room Understanding & Computer Vision State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);
  const [aiOcclusionUrl, setAiOcclusionUrl] = useState<string | null>(null);
  const [debugOverlayUrl, setDebugOverlayUrl] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [roomType, setRoomType] = useState<string>("Living Room");
  const [placementReason, setPlacementReason] = useState<string>("AI spatial floor analysis active.");

  const canvasNode = useRef<HTMLCanvasElement | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const placedFromUrl = useRef(false);

  const [wrapSize, setWrapSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    if (!wrap.current) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWrapSize({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  const sp = useSearchParams();
  const router = useRouter();
  const rugUrl = sp.get("rugUrl");
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const selected = rugs.find((r) => r.instanceId === selectedId) || null;

  const rebuildMask = useCallback(async (nextFloor: FloorQuad, clicks: OccludeClick[], auto: boolean) => {
    const img = roomImgRef.current;
    if (!img) return;
    setMaskBusy(true);
    try {
      const mask = buildOcclusionMask(img, nextFloor, clicks, auto);
      setOcclusion(mask);
    } catch (e) {
      console.error(e);
    } finally {
      setMaskBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!room || step !== "canvas") return;
    let cancelled = false;
    roomImgRef.current = null;
    
    // Use a small timeout to move setOcclusion out of the synchronous render/effect body
    const timer = setTimeout(() => {
      if (!cancelled) setOcclusion(null);
    }, 0);

    loadRoomImage(room.src).then((img) => {
      if (cancelled) return;
      roomImgRef.current = img;
      rebuildMask(floor, occludeClicks, autoOcclude);
    }).catch(console.error);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, step]);

  const scheduleMask = (nextFloor: FloorQuad, clicks: OccludeClick[], auto: boolean) => {
    if (maskTimer.current) clearTimeout(maskTimer.current);
    maskTimer.current = setTimeout(() => rebuildMask(nextFloor, clicks, auto), 180);
  };

  const onFloorChange = (q: FloorQuad) => {
    setFloor(q);
    if (!calibrating) scheduleMask(q, occludeClicks, autoOcclude);
  };

  const triggerRoomAnalysis = useCallback(async (imageSrcOrBlob: string | Blob, roomName?: string) => {
    setIsAnalyzing(true);
    setAnalysisStatus("Analyzing room geometry & furniture with AI…");
    try {
      const formData = new FormData();
      if (imageSrcOrBlob instanceof Blob) {
        formData.append("room_image", imageSrcOrBlob, "room.jpg");
      } else {
        const res = await fetch(imageSrcOrBlob);
        const blob = await res.blob();
        formData.append("room_image", blob, "room.jpg");
      }

      const resp = await fetch("/api/analyze-room", {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        throw new Error(`Room analysis failed with status ${resp.status}`);
      }

      const data = await resp.json();
      console.log("AI Room Analysis Result:", data);

      if (data.floor_quad) {
        setFloor(data.floor_quad);
      }
      if (data.floor_size) {
        setFloorSize(data.floor_size);
      }
      if (data.occlusion_mask_url) {
        setAiOcclusionUrl(data.occlusion_mask_url);
      }
      if (data.debug_overlay_url) {
        setDebugOverlayUrl(data.debug_overlay_url);
      }
      if (data.room_type) {
        const readableType = data.room_type
          .split("_")
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setRoomType(readableType);
      }
      if (data.suggested_placement?.reason) {
        setPlacementReason(data.suggested_placement.reason);
      }

      if (data.suggested_placement) {
        const { x, z, w, h } = data.suggested_placement;
        const currentFloorSize = data.floor_size || floorSize;
        setRugs((prev) => {
          if (prev.length === 0) {
            const first = OPTIMIZED_RUGS[0];
            const rug: PlacedRug = clampRug(
              {
                instanceId: uid(),
                productId: first.id,
                name: first.name,
                img: first.images[0],
                w: w || 8,
                h: h || 10,
                x: x,
                z: z,
                rot: 0,
              },
              currentFloorSize
            );
            setSelectedId(rug.instanceId);
            return [rug];
          } else {
            return prev.map((r, idx) => {
              if (idx === 0) {
                return clampRug({ ...r, x, z }, currentFloorSize);
              }
              return r;
            });
          }
        });
      }

      toast.success(
        `AI Room Analysis: ${data.room_type ? data.room_type.replace("_", " ") : "Room"} detected`,
        T
      );
    } catch (err: any) {
      console.warn("AI Room Analysis failed:", err);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStatus(null);
    }
  }, [floorSize]);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
        console.log("Fetching Medusa products from:", base);
        const rr = await fetch(`${base}/store/regions`, { headers: { "x-publishable-api-key": key }, signal: AbortSignal.timeout(3000) });
        const { regions } = await rr.json();
        const rid = regions?.[0]?.id;
        const pr = await fetch(
          `${base}/store/products?limit=100&region_id=${rid}&fields=id,title,thumbnail,metadata,handle,collection,images,variants.calculated_price`,
          { headers: { "x-publishable-api-key": key }, signal: AbortSignal.timeout(3000) }
        );
        const d = await pr.json();
        
        if (d.products && d.products.length > 0) {
          console.log("Loaded products from Medusa:", d.products.length);
          setProducts(
            (d.products || []).map((p: any) => ({
              id: p.id,
              name: p.title,
              images: [p.thumbnail || p.images?.[0]?.url || ""],
              category: p.collection?.title || "",
              metadata: p.metadata,
              price: p.variants?.[0]?.calculated_price?.calculated_amount || 0,
            }))
          );
        } else {
          throw new Error("No products from Medusa");
        }
      } catch (e) {
        console.warn("Medusa products failed, using optimized visualizer rugs", e);
        setProducts(OPTIMIZED_RUGS);
      }
    })();
  }, []);

  const place = useCallback(
    (imgUrl: string, name: string, productId: string, size: { w: number; h: number }) => {
      const rug: PlacedRug = clampRug(
        {
          instanceId: uid(),
          productId,
          name,
          img: imgUrl,
          w: size.w,
          h: size.h,
          x: floorSize.widthFt / 2,
          z: floorSize.depthFt * 0.32,
          rot: 0,
        },
        floorSize
      );
      setRugs((prev) => [...prev, rug]);
      setSelectedId(rug.instanceId);
      toast.success(`${name} — ${size.w}×${size.h} ft on the floor`, T);
    },
    [floorSize]
  );

  useEffect(() => {
    if (rugUrl && step === "canvas" && !placedFromUrl.current) {
      placedFromUrl.current = true;
      const t = setTimeout(() => place(rugUrl, "Selected Rug", "url", SIZES[sizeIdx]), 400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rugUrl, step]);

  const resizeTo = (s: { w: number; h: number }) => {
    if (!selected) return;
    setRugs((prev) => prev.map((r) => (r.instanceId === selected.instanceId ? { ...r, w: s.w, h: s.h } : r)));
  };

  const rotate = () => {
    if (!selected) return;
    setRugs((prev) =>
      prev.map((r) => (r.instanceId === selected.instanceId ? { ...r, rot: r.rot + Math.PI / 2 } : r))
    );
  };

  const setRotationDeg = (deg: number) => {
    if (!selected) return;
    const rot = (deg * Math.PI) / 180;
    setRugs((prev) => prev.map((r) => (r.instanceId === selected.instanceId ? { ...r, rot } : r)));
  };

  const copyRug = () => {
    if (!selected) return;
    const clone = clampRug(
      {
        ...selected,
        instanceId: uid(),
        x: selected.x + 1.1,
        z: selected.z + 0.7,
      },
      floorSize
    );
    setRugs((prev) => [...prev, clone]);
    setSelectedId(clone.instanceId);
  };

  const remove = () => {
    if (!selected) return;
    setRugs((prev) => prev.filter((r) => r.instanceId !== selected.instanceId));
    setSelectedId(null);
    setTb(null);
  };

  const applyRoom = (r: Room, calibrate: boolean, fileBlob?: Blob) => {
    setRoom(r);
    setFloor(r.floor);
    setFloorSize(r.floorSize);
    setCalibrating(calibrate);
    setOccludeClicks([]);
    setTool("move");
    setRugs((prev) => {
      if (prev.length === 0) {
        const first = OPTIMIZED_RUGS[0];
        const rug: PlacedRug = clampRug(
          {
            instanceId: uid(),
            productId: first.id,
            name: first.name,
            img: first.images[0],
            w: 8,
            h: 10,
            x: r.floorSize.widthFt / 2,
            z: r.floorSize.depthFt * 0.32,
            rot: 0,
          },
          r.floorSize
        );
        setSelectedId(rug.instanceId);
        return [rug];
      }
      return prev;
    });

    // Run AI Room Understanding & Occlusion Segmentation
    triggerRoomAnalysis(fileBlob || r.src, r.name);
  };

  const switchRoom = (r: Room) => {
    applyRoom(r, false);
    setRoomModal(false);
  };

  const uploadRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const r: Room = {
      name: "Your Room",
      src: url,
      floor: defaultFloorQuad(),
      floorSize: { widthFt: 14, depthFt: 18 },
    };
    applyRoom(r, false, file);
    if (step === "room") setStep("canvas");
    else setRoomModal(false);
  };

  const download = () => {
    const cv = canvasNode.current;
    if (!cv) return;
    const a = document.createElement("a");
    a.href = cv.toDataURL("image/png");
    a.download = `safina-room-${Date.now()}.png`;
    a.click();
    toast.success("Image saved!", T);
  };

  const selectProduct = (p: any) => {
    const rugImg = p.images?.[0] || p.image || "";
    console.log("Selecting product:", p.name, rugImg);
    const parsed = parseSize(p);
    let sz = { w: SIZES[sizeIdx].w, h: SIZES[sizeIdx].h };
    if (parsed) {
      const i = SIZES.findIndex((s) => s.w === parsed.w && s.h === parsed.h);
      if (i >= 0) {
        sz = { w: SIZES[i].w, h: SIZES[i].h };
        setSizeIdx(i);
      } else {
        sz = parsed;
      }
    }
    place(rugImg, p.name, p.id, sz);
  };

  const filtered = products.filter((p: Product) => (p.name || "").toLowerCase().includes(query.toLowerCase()));

  if (step === "room") {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-white overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={() => router.back()} className="text-white/40 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2 transition">
              <X size={14} /> Exit
            </button>
            <span className="text-sm font-serif text-white/50">Safina Room Visualizer</span>
            <button onClick={() => router.push("/visualizer")} className="text-white/30 hover:text-white text-xs uppercase tracking-widest transition">
              AI Mode →
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Choose Your Room</h1>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              Rugs sit on the floor in perspective, pick up the room lighting, and tuck under furniture. Drag, rotate, or copy after you place one.
            </p>
          </motion.div>

          <motion.label
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="block cursor-pointer border-2 border-dashed border-white/15 hover:border-[#7A0C13] p-10 text-center transition-all group mb-10 rounded-lg hover:bg-white/[0.02]"
          >
            <UploadCloud size={36} className="mx-auto text-white/20 group-hover:text-[#7A0C13] mb-3 transition" />
            <p className="text-sm text-white/50 uppercase tracking-widest group-hover:text-white/80 transition">Upload Your Own Room Photo</p>
            <p className="text-[10px] text-white/20 mt-2 tracking-wider">JPG, PNG — any resolution</p>
            <input type="file" accept="image/*" className="hidden" onChange={uploadRoom} />
          </motion.label>

          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-6 text-center">— or choose a sample room —</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ROOMS.map((r, i) => (
              <motion.button
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => {
                  applyRoom(r, false);
                  setStep("canvas");
                }}
                className="relative overflow-hidden aspect-[4/3] group rounded-lg ring-1 ring-white/10 hover:ring-[#7A0C13] hover:ring-2 transition-all"
              >
                <img src={r.src} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm text-white font-serif drop-shadow-lg">{r.name}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#7A0C13]/20">
                  <div className="bg-white text-black text-[10px] uppercase tracking-widest px-4 py-2 font-medium">Select Room</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-white flex flex-col">
      <div className="h-11 bg-[#111] border-b border-white/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setStep("room");
              setRugs([]);
              setSelectedId(null);
            }}
            className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition"
          >
            <X size={13} /> Exit
          </button>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs font-serif text-white/50">Safina Room Visualizer</span>
        </div>
        <div className="flex items-center gap-1">
          <Btn
            icon={<Grid3x3 size={11} />}
            label={calibrating ? "Done calibrating" : "Calibrate floor"}
            onClick={() => {
              const next = !calibrating;
              setCalibrating(next);
              if (!next) rebuildMask(floor, occludeClicks, autoOcclude);
            }}
            active={calibrating}
          />
          <Btn icon={<Home size={11} />} label="Change Room" onClick={() => setRoomModal(true)} />
          <Btn icon={<Download size={11} />} label="Save" onClick={download} />
          <div className="w-px h-4 bg-white/8 mx-0.5" />
          <button onClick={() => router.push("/visualizer")} className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest px-2 py-1 transition">
            AI Mode →
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[280px] bg-[#111] border-r border-white/10 flex flex-col shrink-0 overflow-hidden">
          <div className="p-3.5 border-b border-white/10 shrink-0 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] uppercase tracking-widest text-white/50 flex items-center gap-1.5 font-medium">
                <Sparkles size={11} className="text-[#a82028]" /> AI Room Intelligence
              </p>
              {isAnalyzing ? (
                <span className="flex items-center gap-1 text-[8px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                  <Loader2 size={9} className="animate-spin" /> Analyzing
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[8px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                </span>
              )}
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between items-baseline text-[10px]">
                <span className="text-white/40">Space Type</span>
                <span className="text-white/90 font-medium font-serif">{roomType}</span>
              </div>
              <div className="flex justify-between items-baseline text-[10px]">
                <span className="text-white/40">Estimated Floor</span>
                <span className="text-white/70 font-mono text-[9px]">{floorSize.widthFt} × {floorSize.depthFt} ft</span>
              </div>
              <div className="text-[9px] text-white/40 leading-relaxed bg-white/[0.03] p-2 rounded border border-white/5">
                {placementReason}
              </div>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => room && triggerRoomAnalysis(room.src, room.name)}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[8px] uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded transition disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                Re-Analyze
              </button>
              <button
                onClick={() => setShowDebug((prev) => !prev)}
                className={`px-2.5 py-1.5 text-[8px] uppercase tracking-wider border rounded transition flex items-center gap-1 ${
                  showDebug
                    ? "bg-[#7A0C13] border-[#7A0C13] text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                }`}
                title="Toggle AI Computer Vision Segmentation Overlay"
              >
                <Eye size={10} />
                Vision
              </button>
            </div>
          </div>

          <div className="p-3 border-b border-white/10 shrink-0">
            <p className="text-[8px] uppercase tracking-widest text-white/25 mb-2">Furniture</p>
            <div className="flex gap-1 mb-2">
              {(
                [
                  ["move", "Move", MousePointer2],
                  ["under", "Under", EyeOff],
                  ["reveal", "Reveal", Eraser],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  onClick={() => setTool(id)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[8px] uppercase tracking-wider border transition ${
                    tool === id ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:text-white/70"
                  }`}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-[10px] text-white/45 cursor-pointer">
              <input
                type="checkbox"
                checked={autoOcclude}
                onChange={(e) => {
                  const auto = e.target.checked;
                  setAutoOcclude(auto);
                  rebuildMask(floor, occludeClicks, auto);
                }}
              />
              Auto-hide under objects
            </label>
            {maskBusy && <p className="text-[9px] text-white/30 mt-1">Detecting furniture…</p>}
            <p className="text-[9px] text-white/25 mt-1.5 leading-relaxed">
              Under: click a sofa or table to send the rug behind it. Reveal: click to undo.
            </p>
          </div>

          {selected && (
            <div className="p-3 border-b border-white/10 bg-white/[0.015] shrink-0">
              <div className="flex gap-2.5">
                <div className="w-12 h-12 bg-white/10 shrink-0 overflow-hidden border border-white/10">
                  <img src={selected.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-white/25 uppercase tracking-widest">Safina Carpets</p>
                  <p className="text-xs font-serif text-white truncate mt-0.5">{selected.name}</p>
                  <p className="text-[10px] text-white/35">
                    {selected.w} × {selected.h} ft
                  </p>
                </div>
              </div>
            </div>
          )}

          {selected && (
            <div className="p-3 border-b border-white/10 shrink-0">
              <p className="text-[8px] uppercase tracking-widest text-white/25 mb-2">
                Rotate {Math.round((((selected.rot * 180) / Math.PI) % 360 + 360) % 360)}°
              </p>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={Math.round((((selected.rot * 180) / Math.PI) % 360 + 360) % 360)}
                onChange={(e) => setRotationDeg(+e.target.value)}
                className="w-full accent-[#7A0C13]"
              />
            </div>
          )}

          {selected && (
            <div className="p-3 border-b border-white/10 shrink-0">
              <p className="text-[8px] uppercase tracking-widest text-white/25 mb-2">Size</p>
              <div className="flex flex-wrap gap-1">
                {SIZES.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => {
                      setSizeIdx(i);
                      resizeTo(s);
                    }}
                    className={`px-2 py-1 text-[9px] tracking-wider border transition ${
                      selected.w === s.w && selected.h === s.h
                        ? "bg-white text-black border-white font-medium"
                        : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-2.5 border-b border-white/10 shrink-0">
            <div className="relative">
              <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/15" />
              <input
                type="text"
                placeholder="Search rugs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/8 text-white text-[11px] py-1.5 pl-7 pr-3 placeholder-white/15 focus:outline-none focus:border-[#7A0C13]/50 transition"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-2 space-y-0.5">
              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-white/15 text-[10px]">No rugs found</p>
                </div>
              )}
              {filtered.map((p: Product) => (
                <button
                  key={p.id}
                  onClick={() => selectProduct(p)}
                  className={`w-full flex items-center gap-2.5 p-2 text-left transition group ${
                    selected?.productId === p.id ? "bg-[#7A0C13]/15 border border-[#7A0C13]/30" : "border border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="w-11 h-11 bg-white/5 shrink-0 overflow-hidden">
                    <img
                      src={p.images?.[0] || (p as any).image || ""}
                      alt={p.name || "Rug"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/80/1a1a1a/333?text=·";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-white/70 truncate">{p.name}</p>
                    <p className="text-[9px] text-white/25 mt-0.5">{p.category || "Rug"}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 relative bg-[#1a1a1a]">
          <div ref={wrap} className="absolute inset-0">
            {room && (
              <FloorRugCanvas
                roomSrc={room.src}
                floor={floor}
                floorSize={floorSize}
                rugs={rugs}
                selectedId={selectedId}
                calibrating={calibrating}
                tool={tool}
                occlusion={occlusion}
                occlusionMaskUrl={aiOcclusionUrl}
                showDebug={showDebug}
                debugOverlayUrl={debugOverlayUrl}
                onFloorChange={onFloorChange}
                onRugsChange={setRugs}
                onSelect={setSelectedId}
                onToolbar={setTb}
                onReadyCanvas={(c) => {
                  canvasNode.current = c;
                }}
                onOccludeClick={(pt, add) => {
                  const clicks = [...occludeClicks, { x: pt.x, y: pt.y, add }];
                  setOccludeClicks(clicks);
                  rebuildMask(floor, clicks, autoOcclude);
                }}
              />
            )}
            {isAnalyzing && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5">
                <Loader2 size={14} className="animate-spin text-[#a82028]" />
                <span className="tracking-wide">AI analyzing room perspective & furniture...</span>
              </div>
            )}
          </div>

          <AnimatePresence>
            {tb && selected && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute z-30 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/15 rounded-xl px-1 py-0.5 flex items-center"
                style={{
                  left: `${Math.min(Math.max(tb.x - 110, 8), wrapSize.w - 230)}px`,
                  top: `${Math.min(tb.y, wrapSize.h - 56)}px`,
                }}
              >
                <button onClick={rotate} className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition">
                  <RotateCw size={15} />
                  <span className="text-[7px] uppercase tracking-wider">Rotate</span>
                </button>
                <div className="w-px h-7 bg-white/10" />
                <button onClick={copyRug} className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition">
                  <Copy size={15} />
                  <span className="text-[7px] uppercase tracking-wider">Copy</span>
                </button>
                <div className="w-px h-7 bg-white/10" />
                <button onClick={remove} className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                  <Trash2 size={15} />
                  <span className="text-[7px] uppercase tracking-wider">Remove</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {calibrating && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white/80 text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 rounded">
              Drag the 4 corners onto the floor · 1 ft grid
            </div>
          )}
          {tool !== "move" && !calibrating && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white/80 text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 rounded">
              {tool === "under" ? "Click furniture to hide the rug under it" : "Click to reveal the rug again"}
            </div>
          )}

          <div className="absolute bottom-3 right-3 z-20 bg-black/50 text-white/30 text-[8px] uppercase tracking-widest px-3 py-1 border border-white/5 rounded">
            {room?.name}
          </div>

          {rugs.length === 0 && !calibrating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur px-10 py-8 text-center border border-white/10 rounded-lg"
              >
                <ArrowRight size={24} className="mx-auto text-white/20 mb-3 -rotate-180" />
                <p className="text-white/50 text-sm font-serif">Select a rug from the catalog</p>
                <p className="text-white/20 text-[9px] uppercase tracking-widest mt-2">Drag on the floor · Toolbar to rotate or copy</p>
              </motion.div>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {roomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur flex items-center justify-center p-6"
            onClick={() => setRoomModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#111] border border-white/10 p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-5">
                <h2 className="text-lg font-serif text-white">Change Room</h2>
                <button onClick={() => setRoomModal(false)} className="text-white/40 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <label className="block cursor-pointer border border-dashed border-white/20 hover:border-[#7A0C13] p-5 text-center transition group mb-5 rounded">
                <UploadCloud size={22} className="mx-auto text-white/20 group-hover:text-[#7A0C13] mb-1" />
                <span className="text-xs text-white/40 uppercase tracking-widest">Upload Your Room</span>
                <input type="file" accept="image/*" className="hidden" onChange={uploadRoom} />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROOMS.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => switchRoom(r)}
                    className={`relative overflow-hidden aspect-[4/3] rounded ${room?.src === r.src ? "ring-2 ring-[#7A0C13]" : "ring-1 ring-white/10"}`}
                  >
                    <img src={r.src} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30" />
                    <p className="absolute bottom-1.5 left-2 text-[9px] text-white drop-shadow-lg">{r.name}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Btn({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 border transition ${
        active ? "text-white border-white/30 bg-white/10" : "text-white/35 hover:text-white border-white/[0.06] hover:border-white/20"
      }`}
    >
      {icon} {label}
    </button>
  );
}

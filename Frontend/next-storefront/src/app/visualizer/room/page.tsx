"use client";
import dynamic from "next/dynamic";

const RoomVisualizer = dynamic(
  () => import("../../../components/visualizer/RoomVisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 text-sm uppercase tracking-widest animate-pulse">
          Loading Room Visualizer...
        </div>
      </div>
    ),
  }
);

export default function Page() {
  return <RoomVisualizer />;
}

import RugVisualizer from "@/components/visualizer/RugVisualizer";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AI Rug Visualizer | Safina Carpets",
  description: "Experience our handcrafted rugs in your own space using our AI-powered visualizer.",
};

export default function VisualizerPage() {
  return (
    <main className="w-full">
      <Suspense fallback={<div className="min-h-screen bg-[#f7f7f7] pt-[130px] flex items-center justify-center text-[#7A0C13]">Loading...</div>}>
        <RugVisualizer />
      </Suspense>
    </main>
  );
}

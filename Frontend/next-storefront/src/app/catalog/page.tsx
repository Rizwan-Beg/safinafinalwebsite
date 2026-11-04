import type { Metadata } from "next";
import CatalogNew from "../../components/Shop/CatalogNew";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Exclusive Handcrafted Carpet Collection | Safina Carpets",
  description:
    "Explore Safina Carpets' curated catalog of authentic, hand-knotted Persian, Oriental, and contemporary luxury rugs. Filter by size, material, weave, and heritage collection.",
  openGraph: {
    title: "Safina Carpets Catalog | Luxury Handcrafted Rugs",
    description: "Browse the full catalog of handcrafted luxury rugs, woven by master artisans.",
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-display text-xl text-shibumi-maroon">
          Loading Collection...
        </div>
      }
    >
      <CatalogNew />
    </Suspense>
  );
}

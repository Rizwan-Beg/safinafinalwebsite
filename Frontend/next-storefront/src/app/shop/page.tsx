import type { Metadata } from "next";
import PageComponent from "../../old-pages/Shop/Shop";

export const metadata: Metadata = {
  title: "Shop by Category & Size | Safina Carpets",
  description:
    "Explore Safina Carpets by dimensions, style, and collection. Find runner rugs, living room centerpieces, and oversized heirloom carpets.",
  openGraph: {
    title: "Shop Luxury Carpets by Size & Style | Safina Carpets",
    description: "Browse curated rugs by dimension, weave, and heritage aesthetic.",
  },
};

export default function Page() {
  return <PageComponent />;
}

const MEDUSA_BASE =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export function getProductImageUrl(product) {
  if (!product) return "https://placehold.co/400x400/f5f0ec/7a0c13?text=Safina";

  const thumb = product.thumbnail;
  if (thumb) {
    return thumb.startsWith("http") ? thumb : `${MEDUSA_BASE}${thumb}`;
  }

  const firstImage = product.images?.[0]?.url || product.images?.[0];
  if (firstImage) {
    return firstImage.startsWith("http") ? firstImage : `${MEDUSA_BASE}${firstImage}`;
  }

  if (product.image) {
    if (product.image.startsWith("http") || product.image.startsWith("/")) {
      return product.image.startsWith("/")
        ? product.image
        : product.image;
    }
    return `${MEDUSA_BASE}/${product.image}`;
  }

  return "https://placehold.co/400x400/f5f0ec/7a0c13?text=Safina";
}

export function getProductTitle(product) {
  return product?.title || product?.name || "Untitled piece";
}

export function getProductPrice(product, currency = "INR") {
  if (product?.priceData) {
    if (currency === "USD") {
      return { price: product.priceData.usd || 0, symbol: "$" };
    }
    return { price: product.priceData.inr || 0, symbol: "₹" };
  }
  const raw = product?.price ?? product?.variants?.[0]?.calculated_price ?? 0;
  const price =
    typeof raw === "number" && raw > 10000 ? raw / 100 : Number(raw) || 0;
  return { price, symbol: currency === "USD" ? "$" : "₹" };
}

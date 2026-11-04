import type { Metadata } from "next";
import Purchase from "../../../old-pages/Purchase/Purchase";
import { fetchProductById } from "../../../services/productService";

interface Props {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  try {
    const product = await fetchProductById(productId);
    if (!product) {
      return {
        title: "Product Not Found | Safina Carpets",
        description: "The requested luxury carpet could not be found.",
      };
    }

    const title = `${product.name} | Safina Carpets`;
    const description =
      product.description ||
      `Explore ${product.name}, hand-knotted by generational artisans with unmatched craftsmanship. Available at Safina Carpets.`;
    const ogImage = product.imageUrl || product.image;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        images: ogImage
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 800,
                alt: product.name,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch {
    return {
      title: "Luxury Carpet | Safina Carpets",
      description: "Handcrafted heritage carpets by Safina Carpets.",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;

  let product = null;
  try {
    product = await fetchProductById(productId);
  } catch (error) {
    console.error("Failed to SSR fetch product:", error);
  }

  // Schema.org structured data for SEO rich snippets
  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.imageUrl || product.image,
        description: product.description,
        brand: {
          "@type": "Brand",
          name: "Safina Carpets",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: product.price,
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Purchase initialProduct={product} />
    </>
  );
}

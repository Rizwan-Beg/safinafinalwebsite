import { Metadata } from "next";
import BlogDetailPage from "../../../components/blog/BlogDetailPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

  try {
    const res = await fetch(`${baseUrl}/store/blogs?id=${id}`, {
      headers: { "x-publishable-api-key": publishableKey },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.blog) {
        const blog = data.blog;
        return {
          title: `${blog.title} | Safina Carpets Journal`,
          description: blog.excerpt || blog.summary || "Explore heritage, craftsmanship, and timeless rug design in the Safina Journal.",
          openGraph: {
            title: blog.title,
            description: blog.excerpt || blog.summary,
            images: blog.image ? [{ url: blog.image }] : [],
          },
        };
      }
    }
  } catch (_) {}

  return {
    title: "Journal & Stories | Safina Carpets",
    description: "Explore heritage, craftsmanship, and timeless rug design in the Safina Carpets Journal.",
  };
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogDetailPage id={id} />;
}


import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "static", "blogs.json")

const DEFAULT_BLOGS = {
  blogs: [
    {
      id: "post-1",
      slug: "mughal-art-in-modern-homes",
      title: "The Renaissance of Mughal Art in Modern Homes",
      excerpt: "Discover how centuries-old weaving techniques are finding a new life in contemporary minimalist interiors. We explore the bridge between ancient Persia and modern New York.",
      content: "For centuries, Mughal rug artisans in Northern India crafted intricate floral patterns, silk knots, and rich jewel-toned dyes for royal palaces. Today, interior designers in London, Paris, and New York are discovering that these timeless woven masterpieces serve as anchor elements in contemporary minimalist spaces.\n\n### The Contrast of History and Modernity\n\nWhen placed against concrete walls, floor-to-ceiling glass, or Scandinavian oak flooring, a hand-knotted Mughal rug introduces warmth, texture, and emotional depth. The juxtaposition of architectural minimalism with complex hand-knotted artistry creates a harmonious balance.\n\n### Sustainable Heritage\n\nUnlike synthetic mass-produced floor coverings that end up in landfills after a few years, hand-knotted wool and silk rugs are heirloom investments designed to endure for generations. Each Safina carpet takes between 6 to 18 months of continuous handwork by skilled master weavers.",
      category: "Heritage",
      author: "Rizwan Beg",
      date: "May 15, 2026",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop",
      isFeatured: true,
      isPublished: true
    },
    {
      id: "post-2",
      slug: "sustainable-silk-luxury-rugs",
      title: "Sustainable Silk: The Future of Luxury Rugs",
      excerpt: "Exploring the eco-conscious journey of our silk collection, from ethical harvesting to natural dyes. Luxury that doesn't cost the Earth.",
      content: "True luxury is born from respect—for the artisan, the craft, and the planet. In our ongoing commitment to sustainability, Safina Carpets uses 100% natural mulberry silk and organic plant-based dyes derived from pomegranate peels, indigo leaves, and madder root.\n\n### Natural Dyeing Mastery\n\nChemical dyes may yield quick results, but natural vegetable dyes age gracefully over decades, developing a soft, luminous patina that synthetic colors can never replicate. Our dye masters blend centuries-old recipes to achieve complex shades of deep indigo, warm saffron, and terracotta.",
      category: "Sustainability",
      author: "Safina Design Team",
      date: "May 10, 2026",
      image: "https://images.unsplash.com/photo-1575313021311-bd3079410b6e?q=80&w=1000&auto=format&fit=crop",
      isFeatured: false,
      isPublished: true
    },
    {
      id: "post-3",
      slug: "colors-of-the-silk-road",
      title: "Mastering the Palette: Colors of the Silk Road",
      excerpt: "A deep dive into the symbolic meanings behind the vibrant colors used in our signature collections. From Indigo blues to Terracotta reds.",
      content: "Every color woven into a Safina rug carries historical symbolism. Blue represents eternity and peace; red symbolizes courage and passion; gold signifies warmth and prosperity.\n\nBy carefully balancing color palettes, our designers create carpets that adapt seamlessly to evolving interior trends while retaining their timeless allure.",
      category: "Design",
      author: "Master Weaver",
      date: "May 05, 2026",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
      isFeatured: false,
      isPublished: true
    },
    {
      id: "post-4",
      slug: "architecture-of-a-knot",
      title: "The Architecture of a Knot",
      excerpt: "Understanding the technical precision required to create a carpet that lasts for generations. It's more than weaving; it's engineering.",
      content: "A high-density hand-knotted carpet contains up to 400 knots per square inch. This remarkable knot density produces intricate detail, exceptional durability, and a smooth, luxurious pile texture underfoot.",
      category: "Craft",
      author: "Elena Rossi",
      date: "April 28, 2026",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop",
      isFeatured: false,
      isPublished: true
    }
  ]
}

function getBlogsData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8")
      return JSON.parse(content)
    }
  } catch (e) {
    console.error("Error reading blogs JSON data file:", e)
  }
  return DEFAULT_BLOGS
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const data = getBlogsData()
  const allBlogs = data.blogs || []
  
  // Filter only published blogs for storefront
  const publishedBlogs = allBlogs.filter((b: any) => b.isPublished !== false)

  const { id } = req.query as { id?: string }

  if (id) {
    const singlePost = publishedBlogs.find((b: any) => String(b.id) === String(id) || String(b.slug) === String(id))
    if (!singlePost) {
      res.status(404).json({ message: "Article not found" })
      return
    }
    res.json({ blog: singlePost })
    return
  }

  res.json({ blogs: publishedBlogs })
}

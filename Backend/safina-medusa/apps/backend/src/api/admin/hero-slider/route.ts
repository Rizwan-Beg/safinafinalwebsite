import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "static", "hero-slider.json")

const DEFAULT_SLIDER_DATA = {
  slides: [
    {
      id: "slide-1",
      type: "video",
      src: "/rugbg.mp4",
      tagline: "HANDCRAFTED EXCELLENCE SINCE 1985",
      title: "Woven with History,\nCrafted for Eternity",
      primaryBtnText: "EXPLORE COLLECTION",
      primaryBtnLink: "/catalog",
      secondaryBtnText: "OUR STORY",
      secondaryBtnLink: "/about",
      isActive: true
    },
    {
      id: "slide-2",
      type: "image",
      src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1920&q=80",
      tagline: "EXCLUSIVE PROMOTION",
      title: "The Royal Silk Collection",
      primaryBtnText: "SHOP SILK RUGS",
      primaryBtnLink: "/catalog?material=silk",
      secondaryBtnText: "CUSTOM RUG STUDIO",
      secondaryBtnLink: "/custom",
      isActive: true
    },
    {
      id: "slide-3",
      type: "image",
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
      tagline: "HAND-KNOTTED ARTISTRY",
      title: "The Heritage Collection",
      primaryBtnText: "EXPLORE RARE FINDS",
      primaryBtnLink: "/catalog?category=heritage",
      secondaryBtnText: "BOOK CONSULTATION",
      secondaryBtnLink: "/appointment",
      isActive: true
    }
  ],
  autoPlaySpeed: 7000,
  enableAutoSlide: true
}

function getSliderData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8")
      return JSON.parse(content)
    }
  } catch (e) {
    console.error("Error reading hero slider config file:", e)
  }
  return DEFAULT_SLIDER_DATA
}

function saveSliderData(data: any) {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8")
  } catch (e) {
    console.error("Error saving hero slider config file:", e)
  }
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const data = getSliderData()
  res.json({ heroSlider: data })
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const body = req.body as any
  const currentData = getSliderData()

  const updatedData = {
    ...currentData,
    ...body,
  }

  saveSliderData(updatedData)
  res.json({ heroSlider: updatedData, success: true })
}

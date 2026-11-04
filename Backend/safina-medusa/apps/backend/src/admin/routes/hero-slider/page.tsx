import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Photo, Plus, Trash } from "@medusajs/icons"
import { Container, Heading, Text, Input, Switch, Button, Label } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

export const config = defineRouteConfig({
  label: "Hero Slider",
  icon: Photo,
})

interface Slide {
  id: string
  type: "video" | "image"
  src: string
  tagline: string
  title: string
  primaryBtnText: string
  primaryBtnLink: string
  secondaryBtnText: string
  secondaryBtnLink: string
  isActive: boolean
}

export default function HeroSliderPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["hero-slider"],
    queryFn: async () => {
      const res = await fetch("/admin/hero-slider")
      return res.json()
    },
  })

  const [slides, setSlides] = useState<Slide[]>([])
  const [enableAutoSlide, setEnableAutoSlide] = useState(true)
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(7000)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (data?.heroSlider) {
      setSlides(data.heroSlider.slides || [])
      setEnableAutoSlide(data.heroSlider.enableAutoSlide ?? true)
      setAutoPlaySpeed(data.heroSlider.autoPlaySpeed || 7000)
    }
  }, [data])

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/admin/hero-slider", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slider"] })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    },
  })

  const handleSave = () => {
    updateMutation.mutate({
      slides,
      enableAutoSlide,
      autoPlaySpeed: Number(autoPlaySpeed),
    })
  }

  const handleSlideChange = (index: number, field: keyof Slide, value: any) => {
    const newSlides = [...slides]
    newSlides[index] = { ...newSlides[index], [field]: value }
    setSlides(newSlides)
  }

  const handleToggleSlide = (index: number, checked: boolean) => {
    handleSlideChange(index, "isActive", checked)
  }

  const handleAddSlide = (type: "image" | "video") => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type: type,
      src: type === "video" ? "/rugbg.mp4" : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
      tagline: type === "video" ? "HANDCRAFTED EXCELLENCE" : "NEW SEASON COLLECTION",
      title: type === "video" ? "Woven with History" : "Modern Luxury Rugs",
      primaryBtnText: "EXPLORE COLLECTION",
      primaryBtnLink: "/catalog",
      secondaryBtnText: "LEARN MORE",
      secondaryBtnLink: "/about",
      isActive: true,
    }
    setSlides([...slides, newSlide])
  }

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      alert("You must keep at least one slide in the hero section.")
      return
    }
    if (confirm(`Are you sure you want to delete Slide ${index + 1}?`)) {
      const newSlides = slides.filter((_, i) => i !== index)
      setSlides(newSlides)
    }
  }

  if (isLoading) {
    return (
      <Container className="p-8">
        <Text>Loading Hero Slider settings...</Text>
      </Container>
    )
  }

  return (
    <Container className="p-8">
      <div className="flex items-center justify-between mb-2">
        <Heading level="h1">Hero Slider & Banners</Heading>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="small"
            onClick={() => handleAddSlide("image")}
          >
            <Plus className="mr-1" /> Add Image Slide
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => handleAddSlide("video")}
          >
            <Plus className="mr-1" /> Add Video Slide
          </Button>
        </div>
      </div>

      <Text className="text-ui-fg-subtle mb-8">
        Manage your storefront home page hero slides. You can toggle slides ON/OFF, edit headlines and links, or add new slides.
      </Text>

      <div className="space-y-8 max-w-4xl">
        {/* Global Settings */}
        <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-6 space-y-4">
          <Heading level="h2" className="text-base font-semibold">Global Controls</Heading>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Auto-Slide Carousel</Label>
              <Text className="text-ui-fg-subtle text-sm">Automatically transition to the next slide after video/timer ends</Text>
            </div>
            <Switch
              checked={enableAutoSlide}
              onCheckedChange={(checked) => setEnableAutoSlide(checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <Label className="text-sm font-medium">Banner Auto-Play Delay (ms)</Label>
              <Input
                type="number"
                value={autoPlaySpeed}
                onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                placeholder="7000"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Slides List */}
        {slides.map((slide, idx) => (
          <div 
            key={slide.id || idx} 
            className={`bg-ui-bg-subtle border rounded-lg p-6 space-y-4 transition-all ${
              slide.isActive !== false ? "border-ui-border-base" : "border-amber-300 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between border-b border-ui-border-base pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-ui-bg-base px-2.5 py-1 rounded border border-ui-border-base">
                  Slide {idx + 1}
                </span>
                <span className={`text-xs uppercase font-semibold px-2 py-0.5 rounded ${
                  slide.type === "video" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                }`}>
                  {slide.type}
                </span>
                {slide.isActive === false && (
                  <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Disabled / Off
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Active</Label>
                  <Switch
                    checked={slide.isActive !== false}
                    onCheckedChange={(checked) => handleToggleSlide(idx, checked)}
                  />
                </div>

                <Button
                  variant="transparent"
                  size="small"
                  onClick={() => handleDeleteSlide(idx)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Slide"
                >
                  <Trash />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">
                  {slide.type === "video" ? "Video File Path or URL" : "Banner Image URL"}
                </Label>
                <Input
                  value={slide.src}
                  onChange={(e) => handleSlideChange(idx, "src", e.target.value)}
                  placeholder={slide.type === "video" ? "/rugbg.mp4" : "https://..."}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Tagline / Eyebrow Text</Label>
                <Input
                  value={slide.tagline}
                  onChange={(e) => handleSlideChange(idx, "tagline", e.target.value)}
                  placeholder="e.g. HANDCRAFTED EXCELLENCE SINCE 1985"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Main Headline</Label>
                <Input
                  value={slide.title}
                  onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                  placeholder="e.g. Woven with History, Crafted for Eternity"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Primary Button Text</Label>
                <Input
                  value={slide.primaryBtnText}
                  onChange={(e) => handleSlideChange(idx, "primaryBtnText", e.target.value)}
                  placeholder="EXPLORE COLLECTION"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Primary Button Link</Label>
                <Input
                  value={slide.primaryBtnLink}
                  onChange={(e) => handleSlideChange(idx, "primaryBtnLink", e.target.value)}
                  placeholder="/catalog"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Secondary Button Text</Label>
                <Input
                  value={slide.secondaryBtnText}
                  onChange={(e) => handleSlideChange(idx, "secondaryBtnText", e.target.value)}
                  placeholder="OUR STORY"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Secondary Button Link</Label>
                <Input
                  value={slide.secondaryBtnLink}
                  onChange={(e) => handleSlideChange(idx, "secondaryBtnLink", e.target.value)}
                  placeholder="/about"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Action Button */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            size="large"
            onClick={handleSave}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Hero Settings"}
          </Button>

          <Button
            variant="secondary"
            size="large"
            onClick={() => handleAddSlide("image")}
          >
            <Plus className="mr-1" /> Add Another Slide
          </Button>

          {saved && (
            <Text className="text-ui-fg-interactive text-sm font-medium">
              ✓ Hero Slider updated successfully!
            </Text>
          )}
        </div>
      </div>
    </Container>
  )
}

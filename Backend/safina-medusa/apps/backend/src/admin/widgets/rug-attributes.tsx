import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Select, Button, Text } from "@medusajs/ui"
import { useState } from "react"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"

const MATERIALS = ["Wool", "Silk", "Cotton", "Jute", "Synthetic", "Blend"]
const SHAPES = ["Rectangle", "Round", "Runner", "Square", "Oval"]
const PATTERNS = ["Tribal", "Geometric", "Floral", "Solid", "Traditional", "Modern"]
const COLORS = ["Red", "Blue", "Beige", "Multi", "Black", "White", "Green", "Pink", "Brown", "Grey"]
const ROOMS = ["Bedroom", "Living Room", "Hallway", "Dining Room", "Office", "Outdoor"]

const RugAttributesWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const product = data
  const [material, setMaterial] = useState<string>(product.metadata?.material as string || "")
  const [shape, setShape] = useState<string>(product.metadata?.shape as string || "")
  const [pattern, setPattern] = useState<string>(product.metadata?.pattern as string || "")
  
  // Safely parse arrays for multi-selects
  const safeArray = (val: any) => Array.isArray(val) ? val : (val ? [val as string] : [])
  
  const [colors, setColors] = useState<string[]>(safeArray(product.metadata?.colors || product.metadata?.color))
  const [rooms, setRooms] = useState<string[]>(safeArray(product.metadata?.rooms))
  
  const [isSaving, setIsSaving] = useState(false)

  const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/admin/products/${product.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: {
            ...product.metadata,
            material,
            shape,
            pattern,
            colors,
            rooms,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update product attributes")
      }
      
      alert("Rug Attributes successfully updated!")
    } catch (error) {
      console.error(error)
      alert("Error saving attributes")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Container className="p-6 mb-4">
      <Heading level="h2" className="mb-4">Rug Attributes</Heading>
      <Text className="text-ui-fg-subtle mb-6">Manage specific characteristics for this rug to power storefront filtering.</Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Text size="small" weight="plus" className="mb-2">Material</Text>
          <Select value={material} onValueChange={setMaterial}>
            <Select.Trigger>
              <Select.Value placeholder="Select material" />
            </Select.Trigger>
            <Select.Content>
              {MATERIALS.map((m) => (
                <Select.Item key={m} value={m}>{m}</Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        <div>
          <Text size="small" weight="plus" className="mb-2">Shape</Text>
          <Select value={shape} onValueChange={setShape}>
            <Select.Trigger>
              <Select.Value placeholder="Select shape" />
            </Select.Trigger>
            <Select.Content>
              {SHAPES.map((s) => (
                <Select.Item key={s} value={s}>{s}</Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        <div>
          <Text size="small" weight="plus" className="mb-2">Pattern</Text>
          <Select value={pattern} onValueChange={setPattern}>
            <Select.Trigger>
              <Select.Value placeholder="Select pattern" />
            </Select.Trigger>
            <Select.Content>
              {PATTERNS.map((p) => (
                <Select.Item key={p} value={p}>{p}</Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <Text size="small" weight="plus" className="mb-2">Colors (Select multiple)</Text>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => toggleSelection(c, colors, setColors)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                colors.includes(c) 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Text size="small" weight="plus" className="mb-2">Rooms (Select multiple)</Text>
        <div className="flex flex-wrap gap-2">
          {ROOMS.map(r => (
            <button
              key={r}
              onClick={() => toggleSelection(r, rooms, setRooms)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                rooms.includes(r) 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="secondary" onClick={handleSave} isLoading={isSaving}>
          Save Attributes
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default RugAttributesWidget

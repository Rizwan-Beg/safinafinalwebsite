import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Sparkles } from "@medusajs/icons"
import { Container, Heading, Text, Input, Switch, Button, Label } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

export const config = defineRouteConfig({
  label: "Announcement",
  icon: Sparkles,
})

export default function AnnouncementPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await fetch("/admin/announcement")
      return res.json()
    },
  })

  const [text, setText] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (data?.announcement) {
      setText(data.announcement.text || "")
      setIsActive(data.announcement.is_active ?? true)
    }
  }, [data])

  const updateMutation = useMutation({
    mutationFn: async (payload: { text?: string; is_active?: boolean }) => {
      const res = await fetch("/admin/announcement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    },
  })

  const handleSave = () => {
    updateMutation.mutate({ text, is_active: isActive })
  }

  const handleToggle = (checked: boolean) => {
    setIsActive(checked)
    // Immediately persist toggle change
    updateMutation.mutate({ text, is_active: checked })
  }

  if (isLoading) {
    return (
      <Container className="p-8">
        <Text>Loading announcement settings...</Text>
      </Container>
    )
  }

  return (
    <Container className="p-8">
      <Heading level="h1" className="mb-2">Announcement Banner</Heading>
      <Text className="text-ui-fg-subtle mb-8">
        Control the announcement banner displayed at the top of the storefront. Toggle it on or off, and edit the message.
      </Text>

      <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-6 space-y-6 max-w-2xl">
        {/* Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-ui-fg-base font-medium">Banner Visibility</Label>
            <Text className="text-ui-fg-subtle text-sm mt-1">
              {isActive ? "The banner is currently visible on the storefront." : "The banner is currently hidden."}
            </Text>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={handleToggle}
          />
        </div>

        <div className="border-t border-ui-border-base" />

        {/* Text editor */}
        <div className="space-y-2">
          <Label className="text-ui-fg-base font-medium">Banner Message</Label>
          <Text className="text-ui-fg-subtle text-sm">
            This text will appear at the top of every page. You can use emojis like 🎉, 🔥, ✨ for emphasis.
          </Text>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. 🎉 40% OFF on Christmas Collection 🎉"
            className="mt-2"
          />
        </div>

        {/* Preview */}
        {text && (
          <div className="space-y-2">
            <Label className="text-ui-fg-base font-medium">Preview</Label>
            <div
              className="text-center py-2 px-4 rounded"
              style={{
                backgroundColor: "#FFE5E6",
                color: "#860a0c",
                fontSize: "12px",
                fontWeight: "200",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                opacity: isActive ? 1 : 0.4,
              }}
            >
              {text}
            </div>
          </div>
        )}

        {/* Save */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          {saved && (
            <Text className="text-ui-fg-interactive text-sm">
              ✓ Saved successfully
            </Text>
          )}
        </div>
      </div>
    </Container>
  )
}

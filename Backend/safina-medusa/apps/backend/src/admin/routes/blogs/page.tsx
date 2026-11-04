import { defineRouteConfig } from "@medusajs/admin-sdk"
import { DocumentText, Plus, Trash, PencilSquare, Star } from "@medusajs/icons"
import { Container, Heading, Text, Input, Switch, Button, Label, Textarea, Select } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const config = defineRouteConfig({
  label: "Blogs / Journal",
  icon: DocumentText,
})

interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  image: string
  isFeatured: boolean
  isPublished: boolean
}

export default function BlogsAdminPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const res = await fetch("/admin/blogs")
      return res.json()
    },
  })

  const blogs: Blog[] = data?.blogs || []

  // Editor Modal / Drawer state
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<Partial<Blog>>({
    title: "",
    excerpt: "",
    content: "",
    category: "Heritage",
    author: "Safina Editorial",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
    isPublished: true,
  })

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] })
      setIsEditing(false)
      resetForm()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] })
      setIsEditing(false)
      resetForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/admin/blogs?id=${id}`, {
        method: "DELETE",
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] })
    },
  })

  const resetForm = () => {
    setEditingPost({
      title: "",
      excerpt: "",
      content: "",
      category: "Heritage",
      author: "Safina Editorial",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1000&auto=format&fit=crop",
      isFeatured: false,
      isPublished: true,
    })
  }

  const handleOpenCreate = () => {
    resetForm()
    setIsEditing(true)
  }

  const handleOpenEdit = (blog: Blog) => {
    setEditingPost(blog)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!editingPost.title) {
      alert("Please enter a story title.")
      return
    }
    if (editingPost.id) {
      updateMutation.mutate(editingPost)
    } else {
      createMutation.mutate(editingPost)
    }
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleTogglePublish = (blog: Blog) => {
    updateMutation.mutate({
      ...blog,
      isPublished: !blog.isPublished,
    })
  }

  if (isLoading) {
    return (
      <Container className="p-8">
        <Text>Loading blog articles...</Text>
      </Container>
    )
  }

  return (
    <Container className="p-8">
      <div className="flex items-center justify-between mb-2">
        <Heading level="h1">Blog & Journal Management</Heading>
        <Button size="small" onClick={handleOpenCreate}>
          <Plus className="mr-1" /> Create New Article
        </Button>
      </div>

      <Text className="text-ui-fg-subtle mb-8">
        Create, edit, and publish editorial articles for your storefront journal. Choose featured stories and filter by category.
      </Text>

      {/* Editor Modal / Form Container */}
      {isEditing && (
        <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-6 mb-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-ui-border-base pb-3">
            <Heading level="h2" className="text-base font-semibold">
              {editingPost.id ? "Edit Article" : "Create New Article"}
            </Heading>
            <Button variant="secondary" size="small" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label className="text-sm font-medium">Article Title</Label>
              <Input
                value={editingPost.title || ""}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                placeholder="e.g. The Renaissance of Mughal Art in Modern Homes"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Category</Label>
              <Input
                value={editingPost.category || "Heritage"}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                placeholder="Heritage / Design / Sustainability / Craft"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Author Name</Label>
              <Input
                value={editingPost.author || ""}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                placeholder="e.g. Rizwan Beg"
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium">Cover Image URL</Label>
              <Input
                value={editingPost.image || ""}
                onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium">Short Excerpt / Summary</Label>
              <Textarea
                value={editingPost.excerpt || ""}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder="Brief 1-2 sentence summary of the article..."
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium">Full Article Content (Markdown or Paragraphs)</Label>
              <Textarea
                value={editingPost.content || ""}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                placeholder="Write full story content here..."
                className="mt-1 min-h-[220px]"
              />
            </div>

            <div className="flex items-center justify-between border-t border-ui-border-base pt-4 md:col-span-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingPost.isPublished !== false}
                    onCheckedChange={(checked) => setEditingPost({ ...editingPost, isPublished: checked })}
                  />
                  <Label className="text-sm">Published on Storefront</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={!!editingPost.isFeatured}
                    onCheckedChange={(checked) => setEditingPost({ ...editingPost, isFeatured: checked })}
                  />
                  <Label className="text-sm">Editor's Choice (Spotlight)</Label>
                </div>
              </div>

              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {editingPost.id ? "Update Story" : "Publish Story"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid / List */}
      <div className="space-y-4 max-w-5xl">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`bg-ui-bg-subtle border rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
              blog.isPublished !== false ? "border-ui-border-base" : "border-amber-300 opacity-60"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {blog.category}
                  </span>
                  {blog.isFeatured && (
                    <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-600" /> Editor's Choice
                    </span>
                  )}
                  {blog.isPublished === false && (
                    <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                      Draft
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-base text-ui-fg-base">{blog.title}</h3>
                <Text className="text-xs text-ui-fg-subtle">
                  By {blog.author} • {blog.date}
                </Text>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-ui-border-base">
              <Switch
                checked={blog.isPublished !== false}
                onCheckedChange={() => handleTogglePublish(blog)}
                title="Toggle Published"
              />
              <Button variant="secondary" size="small" onClick={() => handleOpenEdit(blog)}>
                <PencilSquare /> Edit
              </Button>
              <Button
                variant="transparent"
                size="small"
                onClick={() => handleDelete(blog.id, blog.title)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

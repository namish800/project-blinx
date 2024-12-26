import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CreateSection() {
  const templates = [
    {
      title: "Blog post...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Image studio...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Repurpose web content...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Social post...",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-4">Start creating</h2>
      <div className="relative">
        <div className="flex gap-4 overflow-hidden">
          {templates.map((template, index) => (
            <Card key={index} className="min-w-[300px] p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img src={template.image} alt={template.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-lg text-center">"{template.title}"</p>
            </Card>
          ))}
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -left-4">
          <Button size="icon" variant="outline" className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4">
          <Button size="icon" variant="outline" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


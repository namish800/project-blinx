import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Plus, Search } from "lucide-react"
import Image from "next/image"

export function SearchHeader() {
  return (
    <div className="relative overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-xl relative">
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            <Input 
              className="pl-10 pr-12 py-2 bg-white border-0 rounded-md"
              placeholder="What would you like to create?"
            />
            <Button 
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-600"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>


        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Generate a month of content in minutes.
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Visual Instagram or blog posts, personalized to your brand.
          </p>
          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 h-12 text-lg"
          >
            Choose from five types of content
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>

      {/* Background Content Collage */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="relative w-full h-full transform translate-x-1/4">
          <div className="absolute top-[10%] right-[60%] w-64 h-64 transform -rotate-12">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="Content preview"
              width={256}
              height={256}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="absolute top-[20%] right-[30%] w-64 h-64 transform rotate-6">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="Content preview"
              width={256}
              height={256}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="absolute top-[40%] right-[45%] w-64 h-64 transform -rotate-6">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="Content preview"
              width={256}
              height={256}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/90 to-transparent pointer-events-none" />
    </div>
  )
}


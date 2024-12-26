import { Input } from "@/components/ui/input"

export function SearchHeader() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-semibold mb-8">What will you create today?</h1>
      <div className="relative max-w-xl">
        <div className="absolute left-3 top-3 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded text-sm">
          B
        </div>
        <Input className="pl-12 h-12 text-lg" placeholder="What do you want to create?" />
      </div>
    </div>
  )
}


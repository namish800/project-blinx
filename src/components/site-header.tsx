import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded">
              B
            </div>
            <span className="font-semibold text-xl">Blinx</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-gray-900"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Play demo
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              Sign up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}


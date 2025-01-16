import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold shadow-sm">
              B
            </div>
            <span className="font-semibold text-xl text-foreground">Blinx</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="lg"
              className="text-muted-foreground hover:text-foreground"
            >
              <PlayCircle />
              Play demo
            </Button>
            <Button 
              size="lg"
              className="bg-red-500 text-white hover:bg-red-600 shadow-sm"
            >
              Sign up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}


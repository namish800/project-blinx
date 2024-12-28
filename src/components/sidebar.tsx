import { Search, Home, FolderClosed, Layers, Users, Grid, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PowerIcon } from '@heroicons/react/24/outline';
import { signout } from '@/lib/actions/actions';
import { auth } from '@/auth';
import { HubNavLinks, MainNavLinks } from '@/components/nav-links';

export async function Sidebar() {
  const session = await auth();
  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col">
      {/* Brand */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded">
            B
          </div>
          <span className="font-semibold">Blinx</span>
        </div>

        {/* Team Selector */}
        {/* <Button variant="outline" className="w-full justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 w-6 h-6 flex items-center justify-center rounded text-sm">
              NT
            </div>
            <span>namish's team</span>
          </div>
        </Button> */}

        {/* Search */}
        {/* <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="px-2">
          <MainNavLinks />
        </div>

        {/* Hub Section */}
        <div className="px-4 py-2">
          <h3 className="text-sm text-muted-foreground mb-2">Creative Hub</h3>
        </div>
        <div className="px-2 space-y-1">
            <HubNavLinks />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 w-6 h-6 flex items-center justify-center rounded text-sm">
              N
            </div>
            <div className="text-sm">
              <div>{session?.user?.name}</div>
              <div className="text-xs text-muted-foreground">{session?.user?.email}</div>
            </div>
          </div>
        </div>
        <form
          action={signout}
        >
          <Button type='submit' variant="outline" className="w-full justify-center gap-2">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </form>
        {/* <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          Trial ends in 25 days
        </div> */}
      </div>
    </div>
  )
}


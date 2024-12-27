import { Sidebar } from "@/components/sidebar"
import { SearchHeader } from "@/components/search-header"
import { CreateSection } from "@/components/create-section"

export default function Home() {
  return (
    <main>
      <SearchHeader />
      <CreateSection />
      
      <div className="py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent projects</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            See all
          </button>
        </div>
        {/* Recent projects grid would go here */}
      </div>
    </main>
  )
}


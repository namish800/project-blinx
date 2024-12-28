import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BrandListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="hover:shadow-lg transition-shadow h-full relative">
          <div className="absolute top-2 right-2">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            {/* Content area left empty intentionally */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


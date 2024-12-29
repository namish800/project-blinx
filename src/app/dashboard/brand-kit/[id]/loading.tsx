import { Skeleton } from "@/components/ui/skeleton"

export default function BrandKitLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Name Skeleton */}
        <div>
          <Skeleton className="h-10 w-1/3 mb-4" />
          <Skeleton className="h-6 w-2/3" />
        </div>

        {/* Brand Style Skeleton */}
        <section>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-1/4 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-24" />
              ))}
            </div>
          </div>
        </section>

        {/* Text Style Guide Skeleton */}
        <section>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                  <Skeleton className="h-6 w-1/4 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Language Selector Skeleton */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-1/6" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </section>
      </div>
    </div>
  )
}


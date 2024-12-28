import { BrandList } from "@/components/brand-list"
import { CreateBrandButton } from "@/components/create-brand-button"
import { BrandsHero } from "@/components/brands-hero"
import { fetchBrandKits } from "@/lib/data"
import { Suspense } from "react"
import { BrandListSkeleton } from "@/components/brand-kits-skeleton"

export default async function BrandKits() {
  const brands = await fetchBrandKits()

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandsHero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900" id="brand-list">Brand Kits</h2>
          <CreateBrandButton />
        </div>
        <Suspense fallback={<BrandListSkeleton />}>
          <BrandList />
        </Suspense>
      </div>
    </div>
  )
}


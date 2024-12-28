import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchBrandKits } from "@/lib/data"
import { Eye } from 'lucide-react'

export async function BrandList() {
  const brands = await fetchBrandKits()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <Link href={`brand-kit/${brand.id}`} key={brand.id} className="no-underline">
          <Card className="hover:shadow-lg transition-shadow h-full relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="h-5 w-5 text-gray-500" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">{brand.name}</CardTitle>
              <CardDescription className="text-gray-500">{brand.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Content area left empty intentionally */}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}




import { BrandStyle } from "@/components/brand-style"
import { TextStyleGuide } from "@/components/text-style-guide"
import { LanguageSelector } from "@/components/language-selector"
import { InfoIcon } from "@/components/info-icon"
import { fetchBrandData } from "@/lib/data"


export default async function BrandPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const brandData = await fetchBrandData(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Name */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{brandData.name}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {brandData.description}
          </p>
        </div>

        {/* Brand Style */}
        <section>
          <BrandStyle 
            colorPalettes={brandData.brandStyle.colorPalettes}
            logos={brandData.brandStyle.logos}
            fonts={brandData.brandStyle.fonts}
          />
        </section>

        {/* Text Style Guide */}
        <section>
          <TextStyleGuide 
            isDefault={brandData.textStyleGuide.isDefault}
            values={brandData.textStyleGuide.values}
            tones={brandData.textStyleGuide.tones}
            rules={brandData.textStyleGuide.rules}
          />
        </section>

        {/* Language */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">Language</h2>
              <InfoIcon tooltip="Select the primary language for your brand" />
            </div>
            <LanguageSelector initialLanguage={brandData.language} />
          </div>
        </section>
      </div>
    </div>
  )
}


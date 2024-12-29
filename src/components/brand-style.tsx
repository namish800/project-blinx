"use client"

import { useState } from "react"
import { ColorPalette } from "@/components/color-palette"
import { LogoUpload } from "@/components/logo-upload"
import { FontManager } from "@/components/font-manager"
import { InfoIcon } from "@/components/info-icon"
import type { ColorPalette as ColorPaletteType, Logo, Font } from "@/types/brand-dto"
import { updateLogos, updateFonts } from "@/lib/actions/brand-kit-actions"
import { updateColorPalette } from "@/lib/actions/brand-kit-actions"

interface BrandStyleProps {
  brandKitId: string,
  colorPalette: ColorPaletteType
  logos: Logo[]
  fonts: Font[]
}

export function BrandStyle({ 
  brandKitId: brandKitId,
  colorPalette: initialColorPalette, 
  logos: initialLogos, 
  fonts: initialFonts 
}: BrandStyleProps) {
  const [colorPalette, setColorPalette] = useState<ColorPaletteType>(initialColorPalette)
  const [logos, setLogos] = useState<Logo[]>(initialLogos)
  const [fonts, setFonts] = useState<Font[]>(initialFonts)

  const handleUpdatePalette = async (updatedPalette: Partial<ColorPaletteType>) => {
    const updatedColorPalette = {...colorPalette, ...updatedPalette}
    setColorPalette(updatedColorPalette)
    await updateColorPalette(brandKitId, updatedColorPalette)
  }

  const handleAddLogo = async (logo: Logo) => {
    const newLogos = [...logos, logo]
    setLogos(newLogos)
    await updateLogos(brandKitId, newLogos)
  }

  const handleDeleteLogo = async (id: string) => {
    const newLogos = logos.filter(logo => logo.id !== id)
    setLogos(newLogos)
    await updateLogos(brandKitId, newLogos)
  }

  const handleAddFont = async (font: Omit<Font, "id">) => {
    const newFont = { ...font, id: Date.now().toString() }
    const newFonts = [...fonts, newFont]
    setFonts(newFonts)
    await updateFonts(brandKitId, newFonts)
  }

  const handleEditFont = async (id: string, updatedFont: Omit<Font, "id">) => {
    const newFonts = fonts.map(font => 
      font.id === id ? { ...font, ...updatedFont } : font
    )
    setFonts(newFonts)
    await updateFonts(brandKitId, newFonts)
  }

  const handleDeleteFont = async (id: string) => {
    const newFonts = fonts.filter(font => font.id !== id)
    setFonts(newFonts)
    await updateFonts(brandKitId, newFonts)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Brand Style</h2>
          <p className="text-gray-500">
            Define your brand's visual identity with colors, logos, and fonts
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Color Palettes */}
        <section>
          <div>
            <ColorPalette
              colorPalette={colorPalette}
              onUpdatePalette={(colors) => handleUpdatePalette({ colors })}
            />
          </div>
        </section>

        {/* Logos */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-medium">Logos</h3>
                <InfoIcon tooltip="Save multiple logos to easily apply while generating assets and documents" />
              </div>
              <LogoUpload 
                brandKitId={brandKitId}
                logos={logos} 
                onAddLogo={handleAddLogo}
                onDeleteLogo={handleDeleteLogo}
              />
            </section>
        </div>


        {/* Fonts */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-medium">Fonts</h3>
            <InfoIcon tooltip="Define the fonts used in your brand's visual identity" />
          </div>
          <FontManager 
            fonts={fonts}
            onAddFont={handleAddFont}
            onEditFont={handleEditFont}
            onDeleteFont={handleDeleteFont}
          />
        </section>
      </div>
    </div>
  )
}


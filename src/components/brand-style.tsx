"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Plus, Download } from 'lucide-react'
import { ColorPalette } from "@/components/color-palette"
import { LogoUpload } from "@/components/logo-upload"
import { FontManager } from "@/components/font-manager"
import { InfoIcon } from "@/components/info-icon"
import type { ColorPalette as ColorPaletteType, Logo, Font } from "@/types/brand-dto"
import { updateColorPalettes, updateLogos, updateFonts } from "@/lib/actions/brand-kit-actions"

interface BrandStyleProps {
  colorPalettes: ColorPaletteType[]
  logos: Logo[]
  fonts: Font[]
}

export function BrandStyle({ 
  colorPalettes: initialColorPalettes, 
  logos: initialLogos, 
  fonts: initialFonts 
}: BrandStyleProps) {
  const [colorPalettes, setColorPalettes] = useState<ColorPaletteType[]>(initialColorPalettes)
  const [logos, setLogos] = useState<Logo[]>(initialLogos)
  const [fonts, setFonts] = useState<Font[]>(initialFonts)
  const [isDefault, setIsDefault] = useState<boolean>(false)

  const handleAddPalette = async () => {
    const newPalette: ColorPaletteType = {
      id: Date.now().toString(),
      name: "New Palette",
      isDefault: false,
      colors: ["#000000"]
    }
    const newPalettes = [...colorPalettes, newPalette]
    setColorPalettes(newPalettes)
    await updateColorPalettes(newPalettes)
  }

  const handleUpdatePalette = async (id: string, updatedPalette: Partial<ColorPaletteType>) => {
    const newPalettes = colorPalettes.map(palette => 
      palette.id === id ? { ...palette, ...updatedPalette } : palette
    )
    setColorPalettes(newPalettes)
    await updateColorPalettes(newPalettes)
  }

  const handleDeletePalette = async (id: string) => {
    const newPalettes = colorPalettes.filter(palette => palette.id !== id)
    setColorPalettes(newPalettes)
    await updateColorPalettes(newPalettes)
  }

  const handleAddLogo = async (logo: Logo) => {
    const newLogos = [...logos, logo]
    setLogos(newLogos)
    await updateLogos(newLogos)
  }

  const handleDeleteLogo = async (id: string) => {
    const newLogos = logos.filter(logo => logo.id !== id)
    setLogos(newLogos)
    await updateLogos(newLogos)
  }

  const handleAddFont = async (font: Omit<Font, "id">) => {
    const newFont = { ...font, id: Date.now().toString() }
    const newFonts = [...fonts, newFont]
    setFonts(newFonts)
    await updateFonts(newFonts)
  }

  const handleEditFont = async (id: string, updatedFont: Omit<Font, "id">) => {
    const newFonts = fonts.map(font => 
      font.id === id ? { ...font, ...updatedFont } : font
    )
    setFonts(newFonts)
    await updateFonts(newFonts)
  }

  const handleDeleteFont = async (id: string) => {
    const newFonts = fonts.filter(font => font.id !== id)
    setFonts(newFonts)
    await updateFonts(newFonts)
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Default</span>
            <Switch 
              checked={isDefault}
              onCheckedChange={setIsDefault}
            />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Color Palettes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Color Palettes</h3>
              <InfoIcon tooltip="Save multiple color palettes to easily apply while generating assets and documents" />
            </div>
            <Button onClick={handleAddPalette} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Palette
            </Button>
          </div>
          <div className="space-y-6">
            {colorPalettes.map((palette) => (
              <ColorPalette
                key={palette.id}
                {...palette}
                onDefaultChange={(isDefault) => handleUpdatePalette(palette.id, { isDefault })}
                onDeletePalette={() => handleDeletePalette(palette.id)}
                onUpdatePalette={(id, colors) => handleUpdatePalette(id, { colors })}
              />
            ))}
          </div>
        </section>

        {/* Logos */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-medium">Logos</h3>
            <InfoIcon tooltip="Save multiple logos to easily apply while generating assets and documents" />
          </div>
          <LogoUpload 
            logos={logos} 
            onAddLogo={handleAddLogo}
            onDeleteLogo={handleDeleteLogo}
          />
        </section>

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


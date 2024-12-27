"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { ColorPalette } from "@/components/color-palette"
import { LanguageSelect } from "@/components/language-select"
import { InfoIcon } from "@/components/info-icon";

export default function BrandPage() {
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const handleEdit = (section: string) => {
    setEditingSection(section)
    // TODO: Implement edit functionality
    console.log('Editing section:', section)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blinx</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            AI-powered marketing platform that helps businesses create personalized content faster and more efficiently.
          </p>
        </div>

        {/* Brand Style */}
        <section className="mb-16">
          <SectionHeader 
            title="Brand Style" 
            tooltip="Visual elements that define our brand identity"
            onEdit={() => handleEdit('brand-style')}
            showEdit
          />
          <div className="bg-white rounded-lg shadow p-6 space-y-8">
            {/* Logo */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Logo</h3>
              <div className="flex items-center gap-8">
                <div className="bg-red-500 text-white w-16 h-16 flex items-center justify-center rounded-lg text-2xl font-bold">
                  B
                </div>
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-lg text-2xl font-bold">
                  B
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Color Palette</h3>
              <ColorPalette />
            </div>

            {/* Font */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Font</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Primary Font</span>
                  <p className="text-xl font-medium">Inter</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-normal">Regular - 400</p>
                    <p className="text-gray-500">Main body text</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Medium - 500</p>
                    <p className="text-gray-500">Subheadings</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-bold">Bold - 700</p>
                    <p className="text-gray-500">Headlines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Style Guide */}
        <section className="mb-16">
          <SectionHeader 
            title="Text Style Guide" 
            tooltip="Guidelines for writing and tone of voice"
            onEdit={() => handleEdit('text-style')}
            showEdit
          />
          <div className="bg-white rounded-lg shadow p-6 space-y-8">
            {/* Purpose */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Purpose</h3>
              <p className="text-gray-600">
                To communicate the power and simplicity of AI-driven marketing solutions while maintaining a professional and approachable tone.
              </p>
            </div>

            {/* Tones */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tones</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {["Professional", "Approachable", "Confident", "Innovative"].map((tone) => (
                  <div key={tone} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{tone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Use active voice</li>
                <li>Keep sentences concise and clear</li>
                <li>Avoid technical jargon unless necessary</li>
                <li>Be inclusive and accessible</li>
                <li>Maintain consistency in terminology</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Language */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">Language</h2>
              <InfoIcon tooltip="Language preferences and guidelines" />
            </div>
            <LanguageSelect />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferred Terms</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Use "create" instead of "make"</li>
                  <li>Use "platform" instead of "tool"</li>
                  <li>Use "AI-powered" instead of "automated"</li>
                  <li>Use "personalized" instead of "custom"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Terms to Avoid</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Don't use "simple" or "easy"</li>
                  <li>Avoid "revolutionary" or "groundbreaking"</li>
                  <li>Don't use technical abbreviations</li>
                  <li>Avoid negative language</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


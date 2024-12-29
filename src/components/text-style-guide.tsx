"use client"

import { useState, useEffect } from "react"
import { TextStyleSection } from "@/components/text-style-section"
import { RulesSection } from "@/components/rules-section"
import type { TextStyleItem, Rules } from "@/types/brand-dto"
import { updateTextStyleGuide } from "@/lib/actions/brand-kit-actions"

interface TextStyleGuideProps {
  brandKitId: string
  values: TextStyleItem[]
  tones: TextStyleItem[]
  rules: Rules
}

export function TextStyleGuide({
  brandKitId,
  values: initialValues,
  tones: initialTones,
  rules: initialRules,
}: TextStyleGuideProps) {
  const [values, setValues] = useState<TextStyleItem[]>(initialValues)
  const [tones, setTones] = useState<TextStyleItem[]>(initialTones)
  const [rules, setRules] = useState<Rules>(initialRules)

  useEffect(() => {
    const updateDatabase = async () => {
      await updateTextStyleGuide(brandKitId, values, tones, rules)
    }
    updateDatabase()
  }, [brandKitId, values, tones, rules])

  // ------------------ Values Handlers ------------------
  const handleAddValue = (item: Omit<TextStyleItem, "id">) => {
    setValues((prev) => [...prev, { ...item, id: Date.now().toString() }])
  }

  const handleEditValue = (id: string, item: Omit<TextStyleItem, "id">) => {
    setValues((prev) =>
      prev.map((value) => (value.id === id ? { ...value, ...item } : value))
    )
  }

  const handleDeleteValue = (id: string) => {
    setValues((prev) => prev.filter((value) => value.id !== id))
  }

  // ------------------ Tones Handlers ------------------
  const handleAddTone = (item: Omit<TextStyleItem, "id">) => {
    setTones((prev) => [...prev, { ...item, id: Date.now().toString() }])
  }

  const handleEditTone = (id: string, item: Omit<TextStyleItem, "id">) => {
    setTones((prev) =>
      prev.map((tone) => (tone.id === id ? { ...tone, ...item } : tone))
    )
  }

  const handleDeleteTone = (id: string) => {
    setTones((prev) => prev.filter((tone) => tone.id !== id))
  }

  // ------------------ Rules Handler ------------------
  const handleUpdateRules = (newRules: Rules) => {
    setRules((prev) => ({ ...prev, ...newRules }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Text Style Guide
          </h2>
          <p className="text-gray-500">
            Share your style guide to ensure brand adherence in all your generations
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <TextStyleSection
          title="Values"
          items={values}
          onAdd={handleAddValue}
          onEdit={handleEditValue}
          onDelete={handleDeleteValue}
        />

        <TextStyleSection
          title="Tones"
          items={tones}
          onAdd={handleAddTone}
          onEdit={handleEditTone}
          onDelete={handleDeleteTone}
        />

        <RulesSection
          rules={rules}
          onUpdateRules={handleUpdateRules}
        />
      </div>
    </div>
  )
}
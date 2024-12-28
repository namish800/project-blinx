"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { TextStyleSection } from "@/components/text-style-section"
import { RulesSection } from "@/components/rules-section"
import { Download } from 'lucide-react'
import type { TextStyleItem, Rules } from "@/types/brand-dto"
import { updateTextStyleGuide } from "@/lib/actions/brand-kit-actions"

interface TextStyleGuideProps {
  values: TextStyleItem[]
  tones: TextStyleItem[]
  rules: Rules
}

export function TextStyleGuide({ 
  values: initialValues, 
  tones: initialTones, 
  rules: initialRules,
}: TextStyleGuideProps) {
  const [values, setValues] = useState<TextStyleItem[]>(initialValues)
  const [tones, setTones] = useState<TextStyleItem[]>(initialTones)
  const [rules, setRules] = useState<Rules>(initialRules)

  const updateDatabase = async () => {
    await updateTextStyleGuide(values, tones, rules)
  }

  const handleAddValue = async (item: Omit<TextStyleItem, "id">) => {
    const newValues = [...values, { ...item, id: Date.now().toString() }]
    setValues(newValues)
    await updateDatabase()
  }

  const handleEditValue = async (id: string, item: Omit<TextStyleItem, "id">) => {
    const newValues = values.map(value => 
      value.id === id ? { ...value, ...item } : value
    )
    setValues(newValues)
    await updateDatabase()
  }

  const handleDeleteValue = async (id: string) => {
    const newValues = values.filter(value => value.id !== id)
    setValues(newValues)
    await updateDatabase()
  }

  const handleAddTone = async (item: Omit<TextStyleItem, "id">) => {
    const newTones = [...tones, { ...item, id: Date.now().toString() }]
    setTones(newTones)
    await updateDatabase()
  }

  const handleEditTone = async (id: string, item: Omit<TextStyleItem, "id">) => {
    const newTones = tones.map(tone => 
      tone.id === id ? { ...tone, ...item } : tone
    )
    setTones(newTones)
    await updateDatabase()
  }

  const handleDeleteTone = async (id: string) => {
    const newTones = tones.filter(tone => tone.id !== id)
    setTones(newTones)
    await updateDatabase()
  }

  const handleUpdateRules = async (newRules: Rules) => {
    setRules(newRules)
    await updateDatabase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Text Style Guide</h2>
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


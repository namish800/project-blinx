"use client"

import { useState } from "react"
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Rules, Term } from "@/types/brand-dto"

interface RulesSectionProps {
  rules: Rules;
  onUpdateRules: (newRules: Rules) => void;
}

export function RulesSection({ rules, onUpdateRules }: RulesSectionProps) {
  const [newPreferredTerm, setNewPreferredTerm] = useState("")
  const [newTermToAvoid, setNewTermToAvoid] = useState("")

  const handleAddTerm = (type: 'preferredTerms' | 'termsToAvoid') => {
    const newTerm = type === 'preferredTerms' ? newPreferredTerm : newTermToAvoid;
    if (newTerm.trim()) {
      const updatedRules = {
        ...rules,
        [type]: [...rules[type], { id: Date.now().toString(), text: newTerm }]
      };
      onUpdateRules(updatedRules);
      type === 'preferredTerms' ? setNewPreferredTerm("") : setNewTermToAvoid("");
    }
  }

  const handleDeleteTerm = (type: 'preferredTerms' | 'termsToAvoid', id: string) => {
    const updatedRules = {
      ...rules,
      [type]: rules[type].filter(term => term.id !== id)
    };
    onUpdateRules(updatedRules);
  }

  const handleEditTerm = (type: 'preferredTerms' | 'termsToAvoid', id: string, newText: string) => {
    const updatedRules = {
      ...rules,
      [type]: rules[type].map(term => term.id === id ? { ...term, text: newText } : term)
    };
    onUpdateRules(updatedRules);
  }

  const renderTerms = (type: 'preferredTerms' | 'termsToAvoid', title: string) => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleAddTerm(type)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Term
        </Button>
      </div>
      <div className="divide-y">
        <div className="p-6">
          <Input
            placeholder={`Enter ${title.toLowerCase()}`}
            value={type === 'preferredTerms' ? newPreferredTerm : newTermToAvoid}
            onChange={(e) => type === 'preferredTerms' ? setNewPreferredTerm(e.target.value) : setNewTermToAvoid(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTerm(type);
              }
            }}
          />
        </div>
        {rules[type].map((term) => (
          <div key={term.id} className="flex items-center p-6">
            <Input
              defaultValue={term.text}
              onBlur={(e) => handleEditTerm(type, term.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditTerm(type, term.id, e.currentTarget.value);
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTerm(type, term.id)}
              className="ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {renderTerms('preferredTerms', 'Preferred Terms')}
      {renderTerms('termsToAvoid', 'Terms to Avoid')}
    </div>
  )
}


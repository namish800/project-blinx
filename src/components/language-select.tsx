"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LanguageSelectProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelect({ currentLanguage, onLanguageChange }: LanguageSelectProps) {
  return (
    <Select onValueChange={onLanguageChange} value={currentLanguage}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English (US)</SelectItem>
        <SelectItem value="en-gb">English (UK)</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="fr">French</SelectItem>
        <SelectItem value="de">German</SelectItem>
      </SelectContent>
    </Select>
  )
}


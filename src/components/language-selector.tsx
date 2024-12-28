'use client'

import { useState } from 'react'
import { LanguageSelect } from "@/components/language-select"
import { updateLanguage } from '@/lib/actions/brand-kit-actions'

interface LanguageSelectorProps {
  initialLanguage: string;
}

export function LanguageSelector({ initialLanguage }: LanguageSelectorProps) {
  const [language, setLanguage] = useState(initialLanguage);

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    await updateLanguage(newLanguage);
  };

  return (
    <LanguageSelect 
      currentLanguage={language} 
      onLanguageChange={handleLanguageChange} 
    />
  );
}


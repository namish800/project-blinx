'use client'

import { useState } from 'react'
import { LanguageSelect } from "@/components/language-select"
import { updateLanguage } from '@/lib/actions/brand-kit-actions'
import { InfoIcon } from '@/components/info-icon';

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
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-900">Language</h2>
        <InfoIcon tooltip="Select the primary language for your brand" />
      </div>
      <LanguageSelect 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange} 
      />
    </div>
  );
}


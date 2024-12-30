import { Suspense } from 'react'
import { PersonaList } from "@/components/persona-list"
import { PersonaListSkeleton } from "@/components/persona-list-skeleton"
import { CreatePersonaButton } from "@/components/create-persona-button"
import { AudienceHero } from "@/components/audience-hero"

export default function AudiencePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AudienceHero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Buyer Personas</h2>
          <CreatePersonaButton />
        </div>
        <Suspense fallback={<PersonaListSkeleton />}>
          <PersonaList />
        </Suspense>
      </div>
    </div>
  )
}


import { PersonaDetails } from "@/components/persona-details"
import { fetchPersonaById } from "@/lib/data"

export default async function PersonaPage({ params }: { params: { id: string } }) {
  const persona = await fetchPersonaById(params.id)

  if (!persona) {
    return <div>Persona not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <PersonaDetails persona={persona} />
      </div>
    </div>
  )
}


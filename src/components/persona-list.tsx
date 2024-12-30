import Link from 'next/link'
import { PersonaCard } from "@/components/persona-card"
import type { PersonaDTO } from "@/types/persona-dto"
import { fetchPersonas } from "@/lib/data"

export async function PersonaList() {
  const personas: PersonaDTO[] = await fetchPersonas()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {personas.map((persona) => (
        <Link href={`/audience/${persona.id}`} key={persona.id} className="no-underline">
          <PersonaCard persona={persona} />
        </Link>
      ))}
    </div>
  )
}


import Link from 'next/link'
import { PersonaCard } from "@/components/persona-card"
import type { PersonaDTO } from "@/types/persona-dto"
import { fetchPersonasByUserEmail, fetchPersonas } from "@/lib/data"
import { auth } from '@/auth';

export async function PersonaList() {
  const session = await auth();
  const email = session?.user?.email;
  let personas: PersonaDTO[] = [];

  if(email){
    personas = await fetchPersonasByUserEmail(email)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {personas.map((persona) => (
        <Link href={`/dashboard/audience/${persona.id}`} key={persona.id} className="no-underline">
          <PersonaCard persona={persona} />
        </Link>
      ))}
    </div>
  )
}


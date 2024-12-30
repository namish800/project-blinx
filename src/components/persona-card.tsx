import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { PersonaDTO } from "@/types/persona-dto"

interface PersonaCardProps {
  persona: PersonaDTO
}

export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full relative group">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={persona.visualRepresentation} alt={persona.name} />
          <AvatarFallback>{persona.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">{persona.name}</CardTitle>
          <p className="text-sm text-gray-500">{persona.archetype}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600">
          <p><strong>Age:</strong> {persona.demographics.ageRange}</p>
          <p><strong>Location:</strong> {persona.demographics.location}</p>
          <p><strong>Engagement:</strong> {persona.behavioralTraits.engagement}</p>
        </div>
      </CardContent>
    </Card>
  )
}


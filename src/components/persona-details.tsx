import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PersonaDTO } from "@/types/persona-dto"

interface PersonaDetailsProps {
  persona: PersonaDTO
}

export function PersonaDetails({ persona }: PersonaDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={persona.visualRepresentation} alt={persona.name} />
            <AvatarFallback>{persona.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-semibold text-gray-900">{persona.name}</CardTitle>
            <p className="text-xl text-gray-600">{persona.archetype}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Demographics</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Age Range: {persona.demographics.ageRange}</li>
                <li>Gender: {persona.demographics.gender}</li>
                <li>Location: {persona.demographics.location}</li>
                <li>Language: {persona.demographics.language}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Behavioral Traits</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Shopping Habits: {persona.behavioralTraits.shoppingHabits}</li>
                <li>Engagement: {persona.behavioralTraits.engagement}</li>
                <li>Purchase Frequency: {persona.behavioralTraits.purchaseFrequency}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">Pain Points & Motivators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Pain Points</h3>
              <ul className="list-disc list-inside space-y-1">
                {persona.painPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Motivators</h3>
              <ul className="list-disc list-inside space-y-1">
                {persona.motivators.map((motivator, index) => (
                  <li key={index}>{motivator}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">Suggested Targeting</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Values</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Platforms</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {persona.suggestedTargeting.platforms.map((platform, index) => (
                      <Badge key={index} variant="secondary">{platform}</Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Keywords</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {persona.suggestedTargeting.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">{keyword}</Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Interests</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {persona.suggestedTargeting.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Behaviors</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {persona.suggestedTargeting.behaviors.map((behavior, index) => (
                      <Badge key={index} variant="secondary">{behavior}</Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


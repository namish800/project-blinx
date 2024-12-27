import { InfoIcon } from '@/components/info-icon'
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  tooltip: string
  onEdit?: () => void
  showEdit?: boolean
}

export function SectionHeader({ title, tooltip, onEdit, showEdit = false }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <InfoIcon tooltip={tooltip} />
      </div>
      {showEdit && (
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      )}
    </div>
  )
}


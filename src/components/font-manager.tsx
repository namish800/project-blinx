"use client"

import { useState } from "react"
import { Plus, X, Edit2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Font } from "@/types/brand-dto"

const fontUsages = [
  "Primary",
  "Secondary",
  "Headings",
  "Body Text",
  "Accent",
  "UI Elements",
  "Captions",
  "Quotes",
  "Code",
  "Other"
]

interface FontManagerProps {
  fonts: Font[]
  onAddFont: (font: Omit<Font, "id">) => Promise<void>
  onEditFont: (id: string, font: Omit<Font, "id">) => Promise<void>
  onDeleteFont: (id: string) => Promise<void>
}

export function FontManager({ fonts, onAddFont, onEditFont, onDeleteFont }: FontManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFont, setEditingFont] = useState<Font | null>(null)
  const [newFont, setNewFont] = useState<Omit<Font, "id">>({ name: "", usage: "" })

  const handleOpenDialog = (font?: Font) => {
    if (font) {
      setEditingFont(font)
      setNewFont({ name: font.name, usage: font.usage })
    } else {
      setEditingFont(null)
      setNewFont({ name: "", usage: "" })
    }
    setIsDialogOpen(true)
  }


  const handleSaveFont = async () => {
    if (newFont.name && newFont.usage) {
      if (editingFont) {
        await onEditFont(editingFont.id, newFont)
      } else {
        await onAddFont(newFont)
      }
      setIsDialogOpen(false) // Close the dialog after saving
      setNewFont({ name: "", usage: "" }) // Reset the form
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Font
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingFont ? "Edit Font" : "Add New Font"}</DialogTitle>
            <DialogDescription>
              {editingFont ? "Edit the font in your brand style guide." : "Add a new font to your brand style guide."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Font Name"
              value={newFont.name}
              onChange={(e) => setNewFont({ ...newFont, name: e.target.value })}
            />
            <Select
              value={newFont.usage}
              onValueChange={(value) => setNewFont({ ...newFont, usage: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font usage" />
              </SelectTrigger>
              <SelectContent>
                {fontUsages.map((usage) => (
                  <SelectItem key={usage} value={usage}>
                    {usage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveFont}>
              {editingFont ? "Save Changes" : "Add Font"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {fonts.map((font) => (
          <div key={font.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div>
              <h4 className="font-medium text-gray-900">{font.name}</h4>
              <p className="text-sm text-gray-500">{font.usage}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setEditingFont(font)
                  setNewFont({ name: font.name, usage: font.usage })
                  setIsDialogOpen(true)
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteFont(font.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


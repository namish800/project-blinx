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
  const [newFont, setNewFont] = useState<Omit<Font, "id"> | null>(null)
  const [editingFont, setEditingFont] = useState<Font | null>(null)

  const handleAddFont = async () => {
    if (newFont && newFont.name && newFont.usage) {
      await onAddFont(newFont)
      setNewFont(null)
    }
  }

  const handleEditFont = async () => {
    if (editingFont) {
      await onEditFont(editingFont.id, { name: editingFont.name, usage: editingFont.usage })
      setEditingFont(null)
    }
  }

  return (
    <div className="space-y-4">
      <Dialog onOpenChange={() => setNewFont({ name: "", usage: "Primary" })}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Font
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Font</DialogTitle>
            <DialogDescription>
              Add a new font to your brand style guide.
            </DialogDescription>
          </DialogHeader>
          {newFont && (
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
          )}
          <DialogFooter>
            <Button onClick={handleAddFont}>Add Font</Button>
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
              <Dialog onOpenChange={() => setEditingFont(font)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Font</DialogTitle>
                    <DialogDescription>
                      Make changes to your font.
                    </DialogDescription>
                  </DialogHeader>
                  {editingFont && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Font Name"
                        value={editingFont.name}
                        onChange={(e) => setEditingFont({ ...editingFont, name: e.target.value })}
                      />
                      <Select
                        value={editingFont.usage}
                        onValueChange={(value) => setEditingFont({ ...editingFont, usage: value })}
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
                  )}
                  <DialogFooter>
                    <Button onClick={handleEditFont}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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


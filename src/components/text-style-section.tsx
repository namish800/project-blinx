"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { TextStyleItem } from "@/types/brand-dto"

interface TextStyleSectionProps {
  title: string
  items: TextStyleItem[]
  onAdd: (item: Omit<TextStyleItem, "id">) => void
  onEdit: (id: string, item: Omit<TextStyleItem, "id">) => void
  onDelete: (id: string) => void
}

export function TextStyleSection({ 
  title, 
  items, 
  onAdd, 
  onEdit, 
  onDelete 
}: TextStyleSectionProps) {
  const [editingItem, setEditingItem] = useState<TextStyleItem | null>(null)
  const [newItem, setNewItem] = useState<Omit<TextStyleItem, "id"> | null>(null)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleSave = () => {
    if (editingItem) {
      onEdit(editingItem.id, {
        title: editingItem.title,
        description: editingItem.description
      })
      setEditingItem(null)
      setIsEditDialogOpen(false)
    } else if (newItem) {
      onAdd(newItem)
      setNewItem(null)
      setIsNewDialogOpen(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => {
              setNewItem({ title: "", description: "" })
              setIsNewDialogOpen(true)
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {title}</DialogTitle>
              <DialogDescription>
                Create a new {title.toLowerCase()} for your brand style guide.
              </DialogDescription>
            </DialogHeader>
            {newItem && (
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex items-start p-6">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
              <p className="text-gray-500">{item.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setEditingItem(item)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit {title}</DialogTitle>
                    <DialogDescription>
                      Make changes to your {title.toLowerCase()}.
                    </DialogDescription>
                  </DialogHeader>
                  {editingItem && (
                    <div className="space-y-4">
                      <div>
                        <Input
                          placeholder="Title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Description"
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


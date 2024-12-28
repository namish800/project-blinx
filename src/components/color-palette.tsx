"use client"

import { useState } from "react"
import { Plus, MoreVertical, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import type { ColorPalette as ColorPaletteType } from "@/types/brand-dto"

interface ColorProps {
  hex: string
  onDelete?: () => void
}

function Color({ hex, onDelete }: ColorProps) {
  return (
    <div className="relative group">
      <div 
        className="w-24 h-24 rounded-lg shadow-md" 
        style={{ backgroundColor: hex }}
      />
      <div className="mt-2 text-sm font-medium text-gray-900">{hex}</div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

interface ColorPaletteProps extends ColorPaletteType {
  onDeletePalette: (id: string) => void
  onUpdatePalette: (id: string, colors: string[]) => void
}

export function ColorPalette({ id, name, colors, onDeletePalette, onUpdatePalette }: ColorPaletteProps) {
  const [newColor, setNewColor] = useState("#000000")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleAddColor = () => {
    if (colors.length >= 4) {
      toast({
        title: "Color limit reached",
        description: "You can only add up to 4 colors in a palette.",
        variant: "destructive",
      })
      setIsDialogOpen(false)
      return
    }
    if (newColor) {
      onUpdatePalette(id, [...colors, newColor])
      setNewColor("#000000")
      setIsDialogOpen(false)
    }
  }

  const handleDeleteColor = (index: number) => {
    onUpdatePalette(id, colors.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
        {colors.map((color, index) => (
          <Color 
            key={index} 
            hex={color} 
            onDelete={() => handleDeleteColor(index)}
          />
        ))}
        {colors.length < 4 && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
              >
                <Plus className="h-6 w-6 text-gray-400" />
                <span className="sr-only">New Color</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Color</DialogTitle>
                <DialogDescription>
                  Enter a hex color code to add to your palette.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-4">
                <Input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded"
                />
                <Input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
              <DialogFooter>
                <Button onClick={handleAddColor}>Add Color</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Plus, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Logo } from "@/types/brand-dto"
import { toast } from "@/hooks/use-toast"
import { uploadLogo } from "@/lib/actions/brand-kit-actions"

interface LogoUploadProps {
  brandKitId: string
  logos: Logo[]
  onAddLogo: (logo: Logo) => void
  onDeleteLogo: (id: string) => void
}

export function LogoUpload({ brandKitId, logos, onAddLogo, onDeleteLogo }: LogoUploadProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('brandKitId', brandKitId)

      try {
        const newLogo = await uploadLogo(formData)
        onAddLogo(newLogo)
        toast({
          title: "Success",
          description: "Logo uploaded successfully",
        })
      } catch (error) {
        console.error('Upload error:', error)
        toast({
          title: "Error",
          description: "Failed to upload logo",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
        setIsDialogOpen(false)

      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-gray-300 transition-colors">
              <Upload className="h-6 w-6 text-gray-400" />
              <span className="text-sm text-gray-600">Upload</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Logo</DialogTitle>
              <DialogDescription>
                Upload a logo to use in your brand assets. Supported formats: PNG, JPG, SVG
              </DialogDescription>
            </DialogHeader>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="logo" className="sr-only">
                Upload Logo
              </label>
              <input
                id="logo"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
              <Button asChild className="w-full">
                <label htmlFor="logo">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </label>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {logos.map((logo) => (
          <div key={logo.id} className="relative group">
            <img
              src={logo.url}
              alt="Logo"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <button
              onClick={() => onDeleteLogo(logo.id)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Plus className="h-4 w-4 rotate-45" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


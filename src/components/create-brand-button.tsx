"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { createBrand, createBrandFromUrl } from "@/lib/actions/brand-kit-actions"
import { useToast } from "@/hooks/use-toast"

export function CreateBrandButton() {
  const [open, setOpen] = useState(false)
  const [brandUrl, setBrandUrl] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brandDescription, setBrandDescription] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (brandUrl.trim()) {
        await createBrandFromUrl(brandUrl)
      } else if (brandName.trim() && brandDescription.trim()) {
        await createBrand({ name: brandName, description: brandDescription })
      } else {
        toast({
          title: "Error",
          description: "Please enter a URL or fill in both name and description.",
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Success",
        description: "Brand created successfully!",
      })
      resetForm()
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create brand. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setBrandUrl('')
    setBrandName('')
    setBrandDescription('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Brand Kit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Brand Kit</DialogTitle>
            <DialogDescription>
              Enter a URL to automatically create a brand or manually input the details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                value={brandUrl}
                onChange={(e) => setBrandUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>
            <div className="relative">
              <Separator className="my-4" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                or
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={brandDescription}
                onChange={(e) => setBrandDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Brand</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


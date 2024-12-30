"use client"

import { useActionState, useState } from 'react'
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
import { createPersonaFromUrl } from "@/lib/actions/audience-actions"

export function CreatePersonaButton() {
  const [open, setOpen] = useState(false)
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [state, formAction, pending] = useActionState(createPersonaFromUrl, undefined)


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Persona</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create New Persona</DialogTitle>
            <DialogDescription>
              Enter a URL to automatically create a persona based on the website's content.
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
                name="brandUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>Create Persona</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


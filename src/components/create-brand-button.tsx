"use client"

import { useActionState, useState } from "react"
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
import { handleBrandSubmitAction } from "@/lib/actions/brand-kit-actions"

/**
 * Simple interface for how your brand might be shaped
 * (only necessary if you’re using TypeScript).
 */
// interface Brand {
//   id: string
//   name: string
//   description: string
// }

export function CreateBrandButton() {
  const [open, setOpen] = useState(false)


  const [state, formAction, pending] = useActionState(handleBrandSubmitAction, undefined)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Brand Kit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* 
          With server actions:
          - `action={handleBrandSubmitAction}` calls our server function.
          - Must have method="POST" for FormData to be properly handled.
        */}
        <form action={formAction} method="POST">
          <DialogHeader>
            <DialogTitle>Create New Brand Kit</DialogTitle>
            <DialogDescription>
              Enter a URL to automatically create a brand or manually input the details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Brand URL Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brandUrl" className="text-right">
                URL
              </Label>
              <Input
                id="brandUrl"
                name="brandUrl"             // <-- name needed for server action
                type="url"
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
            {/* Brand Name Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brandName" className="text-right">
                Name
              </Label>
              <Input
                id="brandName"
                name="brandName"            // <-- name needed
                className="col-span-3"
              />
            </div>
            {/* Brand Description Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brandDescription" className="text-right">
                Description
              </Label>
              <Textarea
                id="brandDescription"
                name="brandDescription"     // <-- name needed
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {/* 
              Using useFormStatus, we can disable the button while pending 
              or show a different label, e.g., "Creating..."
            */}
            <Button type="submit" disabled={pending}>
              {pending ? "Creating..." : "Create Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

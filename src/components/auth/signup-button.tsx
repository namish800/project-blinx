"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SignUpButton() {
  const router = useRouter()

  return (
    <Button 
      size="lg"
      className="bg-red-500 text-white hover:bg-red-600 shadow-sm"
      onClick={() => router.push('/signup')}
    >
      Sign up
    </Button>
  )
} 
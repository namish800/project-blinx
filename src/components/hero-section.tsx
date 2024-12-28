"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayCircle } from 'lucide-react'
import { joinWaitlist } from "@/lib/actions/actions"
import { useActionState } from "react"
// import dynamic from "next/dynamic";

// // Dynamically import the GlobeScatter component with SSR disabled
// const GlobeScatter = dynamic(() => import("@/components/globe-scatter"), {
//   ssr: false,
// });

const initialState = {
  message: '',
  success: false,
}


export function HeroSection() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState)

  return (
    <div className="relative min-h-screen pt-16 pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Animated Background */}
            {/* <div className="absolute inset-0 z-0">
              <GlobeScatter />
            </div> */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto mb-12 animate-fade-in opacity-0 [--animation-delay:200ms] relative z-10">
        <span className="inline-block animate-slide-up [--animation-delay:400ms] opacity-0">
          Supercharge
        </span>{' '}
        <span className="inline-block animate-slide-up [--animation-delay:600ms] opacity-0">
          Your
        </span>{' '}
        <br />
        <span className="inline-block animate-slide-up [--animation-delay:800ms] opacity-0 bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
          Marketing
        </span>{' '}
        <span className="inline-block animate-slide-up [--animation-delay:1000ms] opacity-0 bg-gradient-to-r from-red-400 to-red-500 text-transparent bg-clip-text">
          with AI
        </span>
      </h1>
      
      <form action={formAction} className="w-full max-w-md mb-8 animate-fade-in opacity-0 [--animation-delay:1200ms] relative z-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="h-12"
          />
          <Button type="submit" size="lg" className="bg-red-500 hover:bg-red-600 h-12 relative overflow-hidden" disabled={pending} aria-busy={pending}>
            {pending ? (
              <>
                <span className="opacity-0">Join the Waitlist</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              "Join the Waitlist"
            )}
          </Button>
        </div>
      </form>
      {state.success && 
        <div className="animate-fade-in opacity-0 [--animation-delay:1200ms] relative z-10">
          <p className="text-lg text-gray-900 mb-4">Thank you for joining the waitlist.</p>
        </div>
      }

      <Button 
        variant="ghost" 
        size="lg" 
        className="text-gray-900 animate-fade-in opacity-0 [--animation-delay:1400ms] relative z-10"
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        Watch demo
      </Button>

      <div className="max-w-6xl mx-auto w-full mt-16 animate-fade-in opacity-0 [--animation-delay:1600ms] relative z-10">
        <img
          src="/placeholder.svg?height=600&width=1200"
          alt="AI Marketing showcase"
          className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  )
}


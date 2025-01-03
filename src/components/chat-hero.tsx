import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function ChatHero() {
  return (
    <div className="bg-gray-50 border-b">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center pb-12">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className="inline-block animate-slide-up [--animation-delay:400ms] opacity-0">
              Create
            </span>{' '}
            <span className="inline-block animate-slide-up [--animation-delay:600ms] opacity-0">
              At The Speed
            </span>{' '}
            <br />
            <span className="inline-block animate-slide-up [--animation-delay:800ms] opacity-0 bg-gradient-to-r from-[#FF3366] to-[#FF6666] text-transparent bg-clip-text">
            Of A
            </span>{' '}
            <span className="inline-block animate-slide-up [--animation-delay:1000ms] opacity-0 bg-gradient-to-r from-[#FF6666] to-[#FF9999] text-transparent bg-clip-text">
               Thought
            </span>{' '}
            
            
          </h1>
          

        </div>
      </div>
    </div>
  )
}


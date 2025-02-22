import Link from 'next/link'
import { Check } from 'lucide-react'
import SignUpForm from '@/components/signup-form'

export default function SignUpPage() {
  const features = [
    "Generate copy, images, and more with AI Copilot",
    "Tailor content to your brand and audiences",
    "Stage product photoshoots in AI Image Studio",
  ]

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 p-12 bg-gray-50 flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded">
            B
          </div>
          <span className="font-semibold text-xl">Blinx</span>
        </div> 
        
        <div className="max-w-xl">
          <h1 className="text-5xl font-semibold mb-12">
            Create personalized content faster
          </h1>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1 bg-red-500 rounded-full p-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-12">
            <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded">
              B
            </div>
            <span className="font-semibold text-xl">Blinx</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Create your account</h2>
            <p className="text-gray-500">Get started with Blinx</p>
          </div>

          <SignUpForm />

          <div className="space-y-4">
            <div className="text-center">
              <span className="text-gray-500">Already have an account? </span>
              <Link href="/login" className="text-black hover:underline font-medium">
                Sign in
              </Link>
            </div>

            <div className="text-sm text-center text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
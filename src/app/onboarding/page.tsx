"use client"
import { useState, useEffect, useRef, useActionState } from 'react'
import { ProgressIndicator } from '@/components/progress-indicator'
import { CreateProfile } from '@/components/create-profile'
import { CompanyInformation } from '@/components/company-information'
import { ContentSelection } from '@/components/content-selection'
import { Button } from '@/components/ui/button'
import { 
  profileSchema, 
  companySchema, 
  contentSchema, 
  type OnboardingData 
} from '@/types/onboarding'
import { createProfile } from '@/lib/actions/actions'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { UserProfileStatus } from '@prisma/client'
import OnboardingForm from '@/components/onboarding-form'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    profile: {
      name: '',
      department: '',
      role: '',
    },
    company: {
      size: '',
      industry: '',
    },
    content: {
      contentTypes: [],
    },
  })
  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({})
  const errorRef = useRef<HTMLDivElement>(null)

  const steps = [
    { number: 1, title: 'Create Profile', active: step === 1, completed: step > 1 },
    { number: 2, title: 'Company Information', active: step === 2, completed: step > 2 },
    { number: 3, title: 'Start Using Blinx', active: step === 3, completed: step > 3 },
  ]

  const validateStep = (stepNumber: number) => {
    let isValid = false
    const newErrors: typeof errors = {}

    try {
      switch (stepNumber) {
        case 1:
          profileSchema.parse(formData.profile)
          break
        case 2:
          companySchema.parse(formData.company)
          break
        case 3:
          contentSchema.parse(formData.content)
          break
      }
      isValid = true
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          const key = err.path[0] as keyof OnboardingData
          newErrors[key] = err.message
        })
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3))
    }
  }

  const handleBack = () => {
    setErrors({})
    setStep(prev => Math.max(prev - 1, 1))
  }

  // Focus on error summary when errors change
  useEffect(() => {
    if (Object.keys(errors).length > 0 && errorRef.current) {
      errorRef.current.focus()
    }
  }, [errors])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md mx-auto">
        <ProgressIndicator steps={steps} />

        {/* Error Summary Positioned Above Steps */}
        <div className="mt-8 mb-6">
          {Object.keys(errors).length > 0 && (
            <div
              className="mb-6 p-4 border border-red-400 bg-red-50 text-red-700 rounded-md"
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              ref={errorRef}
            >
              <h2 className="font-semibold text-lg mb-2">Please fix the following errors:</h2>
              <ul className="list-disc list-inside">
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step Components */}
          {step === 1 && (
            <CreateProfile
              data={formData.profile}
              onChange={(profile) => setFormData({ ...formData, profile })}
              error={errors.profile}
            />
          )}
          {step === 2 && (
            <CompanyInformation
              data={formData.company}
              onChange={(company) => setFormData({ ...formData, company })}
              error={errors.company}
            />
          )}
          {step === 3 && (
            <ContentSelection
              data={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              error={errors.content}
            />
          )}
        </div>

        {/* Button Container */}
        <div className="flex justify-end space-x-4">
          {step > 1 && (
            <Button type="button" variant="ghost" onClick={handleBack} className="text-gray-500">
              Back
            </Button>
          )}
          {step < 3 ? (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <OnboardingForm formData={formData} />
          )}
        </div>
      </div>
    </div>
  )
}

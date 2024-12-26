import { Button } from "@/components/ui/button"
import type { CompanyFormData } from "../types/onboarding"

interface CompanyInformationProps {
  data: CompanyFormData;
  onChange: (data: CompanyFormData) => void;
  error: string | undefined;
}

export function CompanyInformation({ data, onChange, error }: CompanyInformationProps) {
  const companySizes = [
    "1-10",
    "11-50",
    "51-250",
    "251-1K",
    "1K-5K",
    "5K-10K",
    "10K-50K",
    "50K-100K",
    "100K+",
  ]

  const industries = [
    "Retail",
    "CPG",
    "Financial Services",
    "Technology",
    "Travel & Hospitality",
    "Manufacturing",
    "Energy",
    "Other",
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold mb-8 text-center">
        Tell us about your company
      </h1>
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block text-lg">Select the number of employees</label>
          <div className="flex flex-wrap gap-2">
            {companySizes.map((size) => (
              <Button
                key={size}
                variant={data.size === size ? "default" : "outline"}
                onClick={() => onChange({ ...data, size })}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg">What industry do you work in?</label>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={data.industry === industry ? "default" : "outline"}
                onClick={() => onChange({ ...data, industry })}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


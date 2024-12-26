import { Globe, Mail, Facebook, ShoppingBag, FileText, Briefcase, Users, MoreHorizontal } from 'lucide-react'
import type { ContentFormData } from "@/types/onboarding"

interface ContentSelectionProps {
  data: ContentFormData;
  onChange: (data: ContentFormData) => void;
  error: string | undefined;
}

export function ContentSelection({ data, onChange, error }: ContentSelectionProps) {
  const contentTypes = [
    {
      id: "product-photography",
      title: "Product photography",
      icon: Globe,
    },
    {
      id: "emails-sms",
      title: "Emails & SMS",
      icon: Mail,
    },
    {
      id: "social-media",
      title: "Social media posts",
      icon: Facebook,
    },
    {
      id: "ads",
      title: "Ads",
      icon: ShoppingBag,
    },
    {
      id: "blogs",
      title: "Blogs",
      icon: FileText,
    },
    {
      id: "job-postings",
      title: "Job postings",
      icon: Briefcase,
    },
    {
      id: "employee-communication",
      title: "Employee communication",
      icon: Users,
    },
    {
      id: "other",
      title: "Other",
      icon: MoreHorizontal,
    },
  ]

  const toggleContentType = (id: string) => {
    const newTypes = data.contentTypes.includes(id)
      ? data.contentTypes.filter((type) => type !== id)
      : [...data.contentTypes, id]
    onChange({ contentTypes: newTypes })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold mb-8 text-center">
        Let's get started!
      </h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg mb-2">
            What kind of content are you planning to create?
          </h2>
          <p className="text-gray-500 mb-6">Select all that apply</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentTypes.map(({ id, title, icon: Icon }) => (
              <button
                key={id}
                type='button'
                onClick={() => toggleContentType(id)}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-4 hover:border-red-500 transition-colors ${
                  data.contentTypes.includes(id)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    data.contentTypes.includes(id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
                <span className="text-center">{title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


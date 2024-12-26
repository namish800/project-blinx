import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ProfileFormData } from "@/types/onboarding"

interface CreateProfileProps {
  data: ProfileFormData;
  onChange: (data: ProfileFormData) => void;
  error: string | undefined;
}

export function CreateProfile({ data, onChange, error }: CreateProfileProps) {
  const departments = [
    "Marketing",
    "Sales",
    "Design",
    "Human Resources",
    "Product",
    "Marketing Agency",
    "IT",
    "Other",
  ]

  const roles = ["Individual contributor", "Manager/Director", "Executive"]

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold mb-8 text-center">
        Create your profile
      </h1>
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block text-lg">What is your name?</label>
          <Input
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block text-lg">What department are you in?</label>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={data.department === dept ? "default" : "outline"}
                onClick={() => onChange({ ...data, department: dept })}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg">What is your role?</label>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant={data.role === role ? "default" : "outline"}
                onClick={() => onChange({ ...data, role: role })}
                className="min-w-[200px]"
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


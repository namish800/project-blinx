type Step = {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

export function ProgressIndicator({ steps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.active
                  ? 'bg-red-500 text-white'
                  : step.completed
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step.number}
            </div>
            <span
              className={`ml-2 ${
                step.active ? 'text-red-500 font-medium' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-24 h-px bg-gray-200 mx-4" />
          )}
        </div>
      ))}
    </div>
  )
}


interface ColorProps {
    name: string
    hex: string
    className?: string
  }
  
  function Color({ name, hex, className }: ColorProps) {
    return (
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-lg shadow-md mb-2 ${className}`} />
        <span className="text-sm font-medium text-gray-900">{name}</span>
        <span className="text-xs text-gray-500">{hex}</span>
      </div>
    )
  }
  
  export function ColorPalette() {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        <Color name="Primary" hex="#EF4444" className="bg-red-500" />
        <Color name="Secondary" hex="#1F2937" className="bg-gray-800" />
        <Color name="Accent" hex="#EC4899" className="bg-pink-500" />
        <Color name="Background" hex="#FFFFFF" className="bg-white border" />
        <Color name="Text" hex="#111827" className="bg-gray-900" />
        <Color name="Muted" hex="#6B7280" className="bg-gray-500" />
      </div>
    )
  }
  
  
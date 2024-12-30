export function AudienceHero() {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 background-animate border-b">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-white/[0.2]" />
        <div className="container relative mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl text-white">
              <span className="inline-block animate-slide-up [--animation-delay:400ms] opacity-0">
                Know
              </span>{' '}
              <span className="inline-block animate-slide-up [--animation-delay:600ms] opacity-0">
                Your
              </span>{' '}
              <span className="inline-block animate-slide-up [--animation-delay:800ms] opacity-0">
                Audience
              </span>
            </h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Create and manage buyer personas to better understand your target audience.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  
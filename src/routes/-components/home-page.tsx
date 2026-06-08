import { ArrowRight } from 'lucide-react'

export function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-6">
                All-in-one church management for{' '}
                <span className="text-brand-blue">modern ministries</span>
              </h1>
              <p className="text-lg text-gray-600 font-bold mb-8 leading-relaxed">
                FaithConnect helps churches manage members, giving, events,
                communication, and engagement. A SaaS platform with a powerful
                web dashboard and mobile app for members.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                  Request Demo
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                    2,450
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">Members</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                    $18,900
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    Monthly Giving
                  </p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                    24
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    Upcoming Events
                  </p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                    98%
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    Engagement
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/images/home/hero-main.avif"
                  alt="FaithConnect Dashboard and Mobile App"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Mobile Image - shown below on smaller screens */}
          <div className="lg:hidden mt-12 flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="/images/home/hero-main.avif"
                alt="FaithConnect Dashboard and Mobile App"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

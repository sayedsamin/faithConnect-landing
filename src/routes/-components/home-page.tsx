import { ArrowRight } from 'lucide-react'
import { StatsCards } from '#/routes/-components/stats-cards'

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
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
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

              {/* Stats removed from here and placed below to span full hero width */}
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-[34rem]">
                <img
                  src="/images/home/hero-main.avif"
                  alt="FaithConnect dashboard and mobile app preview"
                  className="w-full h-auto object-cover shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
                  style={{
                    maskImage:
                      'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage:
                      'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,1) 100%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Image - shown below on smaller screens */}
          <div className="lg:hidden mt-12 flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="/images/home/hero-main.avif"
                alt="FaithConnect dashboard and mobile app preview"
                className="w-full h-auto rounded-[1.75rem] object-cover shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
                style={{
                  maskImage:
                    'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,1) 100%)',
                  WebkitMaskImage:
                    'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,1) 100%)',
                }}
              />
            </div>
          </div>

          <StatsCards />
        </div>
      </section>
    </div>
  )
}

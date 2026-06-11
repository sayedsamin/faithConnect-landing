import { ArrowRight } from 'lucide-react'
import { StatsCards } from '#/routes/-components/stats-cards'
import { BottomPrompt } from '#/routes/-components/bottom-prompt'
import { BenefitsCard } from '#/routes/-components/benefits-card'

export function HomePage() {
  return (
    <div className="pt-18">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        </div>

        <img
          src="/images/home/about-vision.avif"
          alt="FaithConnect"
          className="absolute object-cover w-full h-180 z-10 brightness-30"
        />

        <div className="z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-28 mb-50">
            {/* Left Content */}
            <div className="z-20 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-white leading-16 mb-6">
                All-in-one church management for{' '}
                <span className="text-brand-blue">modern ministries</span>
              </h1>
              <p className="text-lg text-gray-300 font-bold mb-8 leading-relaxed">
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
            </div>
          </div>

          <BenefitsCard />
          <StatsCards />
          <BottomPrompt />
        </div>
      </section>
    </div>
  )
}

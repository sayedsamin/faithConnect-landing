import { ArrowRight, Users } from 'lucide-react'
import { StatsCards } from '#/routes/-components/stats-cards'
import { BottomPrompt } from '#/routes/-components/bottom-prompt'

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex justify-end items-center">
              <div className="relative w-full max-w-[34rem]">
                <img
                  src="/images/home/about-vision.avif"
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

          <div>
            <p className="font-bold text-gray-900 text-2xl mb-2">
              Everything your church needs in one secure platform.
            </p>

            <div className="w-1/5 p-3 bg-brand-white rounded-xl aspect-square">
              <div className="w-1/5 mb-2 bg-brand-blue rounded-full aspect-square grid grid-cols-1 items-center justify-items-center">
                <Users className="w-5 h-5 text-brand-white" />
              </div>
              <p className="text-2xl font-bold">Membership Management</p>
              <p className="text-sm">
                Manage member profiles, groups, attendance, and engagement in
                one place. A powerful CRM for churches to build stronger
                relationships with their members.
              </p>
            </div>
          </div>

          <StatsCards />
          <BottomPrompt />
        </div>
      </section>
    </div>
  )
}

import { BarChart2, DollarSign, MessageCircle, Zap } from 'lucide-react'

import FeatureCard from './FeatureCard'

export default function AboutSection() {
  return (
    <section className="page-shell py-12">
      <div className="grid items-stretch gap-4 lg:grid-cols-[1.7fr_repeat(4,1fr)]">
        <div className="flex h-full flex-col justify-center rounded-lg bg-white p-4">
          <h2 className="text-xl font-bold text-slate-900">
            Why FaithConnect was created
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Churches today juggle multiple tools, spreadsheets, and manual
            processes just to keep ministry moving. Information gets fragmented,
            communication falls through the cracks, and staff spend more time on
            administration than people.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We built FaithConnect to change that-bringing everything your church
            needs into one secure, easy-to-use platform that works across web
            and mobile.
          </p>
        </div>

        <FeatureCard
          Icon={Zap}
          title="Too Many Disconnected Tools"
          description="Multiple systems create silos and duplicate work."
          colorClass="bg-purple-100 text-purple-600"
        />

        <FeatureCard
          Icon={BarChart2}
          title="Limited Visibility & Reporting"
          description="Hard to track engagement, giving, and ministry impact."
          colorClass="bg-blue-100 text-blue-600"
        />

        <FeatureCard
          Icon={MessageCircle}
          title="Communication Gaps"
          description="Important updates don't reach everyone."
          colorClass="bg-green-100 text-green-600"
        />

        <FeatureCard
          Icon={DollarSign}
          title="Hard to Manage Giving"
          description="Tracking donations, funds, and receipts is complex."
          colorClass="bg-orange-100 text-orange-600"
        />
      </div>
    </section>
  )
}

export function StatsCards() {
  return (
    <div className="mt-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 sm:p-6 shadow-sm">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.65 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-right text-2xl sm:text-3xl font-bold text-brand-dark whitespace-nowrap">
                2,450
              </div>
              <div className="text-right text-sm text-gray-600">Members</div>
            </div>
          </div>

          <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 sm:p-6 shadow-sm">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v2m0 8v2"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-right text-2xl sm:text-3xl font-bold text-brand-dark whitespace-nowrap">
                $18,900
              </div>
              <div className="text-right text-sm text-gray-600">
                Monthly Giving
              </div>
            </div>
          </div>

          <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 sm:p-6 shadow-sm">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-right text-2xl sm:text-3xl font-bold text-brand-dark whitespace-nowrap">
                24
              </div>
              <div className="text-right text-sm text-gray-600">
                Upcoming Events
              </div>
            </div>
          </div>

          <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 sm:p-6 shadow-sm">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 12h2m-1-9a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-right text-2xl sm:text-3xl font-bold text-brand-dark whitespace-nowrap">
                98%
              </div>
              <div className="text-right text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCards

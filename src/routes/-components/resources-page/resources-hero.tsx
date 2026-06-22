import { Search } from 'lucide-react'

type ResourcesHeroProps = {
  onQueryChange: (value: string) => void
  query: string
}

export function ResourcesHero({ onQueryChange, query }: ResourcesHeroProps) {
  return (
    <header className="relative border-b border-brand-blue/8 bg-brand-blue/[0.025] pt-32 pb-14 sm:pt-36 sm:pb-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(0_64_205/0.10),transparent_34%)]"
      />
      <div className="page-shell relative text-center">
        <h1 className="text-4xl leading-tight font-extrabold text-balance text-brand-dark sm:text-5xl">
          Learn. Grow. <span className="text-brand-blue">Lead.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 font-medium text-brand-dark/66 sm:text-lg sm:leading-8">
          Practical guides, helpful tools, and expert insights to strengthen
          your church and simplify ministry.
        </p>

        <form
          role="search"
          className="mx-auto mt-8 max-w-xl"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-brand-dark/42"
            />
            <input
              id="resource-search"
              name="resource-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search resources…"
              autoComplete="off"
              className="min-h-12 w-full rounded-lg border border-brand-blue/15 bg-white py-3 pr-4 pl-12 text-base text-brand-dark shadow-[0_12px_32px_rgb(0_14_53/0.06)] outline-none transition-[border-color,box-shadow] placeholder:text-brand-dark/38 focus-visible:border-brand-blue/45 focus-visible:ring-4 focus-visible:ring-brand-blue/12 sm:text-sm"
            />
          </div>
        </form>
      </div>
    </header>
  )
}

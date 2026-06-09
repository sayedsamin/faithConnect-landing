export function AboutPage() {
  return (
    <section className="page-wrap px-4 pt-32 pb-20 sm:px-6">
      <div className="max-w-3xl">
        <p className="island-kicker">About FaithConnect</p>
        <h1 className="display-title mt-4 text-4xl font-bold text-foreground sm:text-5xl">
          A simple about page placeholder
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          This dummy page is ready for future FaithConnect story, mission, team,
          and community details.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {['Mission content', 'Team highlights', 'Community impact'].map(
          (title) => (
            <article
              key={title}
              className="feature-card rounded-md border border-border p-5"
            >
              <h2 className="text-lg font-extrabold text-foreground">
                {title}
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Placeholder copy can be replaced when final page content is
                ready.
              </p>
            </article>
          ),
        )}
      </div>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [{ title: 'Terms and Conditions | Questura Academy' }],
  }),
})

function TermsPage() {
  return (
    <main className="page-wrap pt-32 pb-20">
      <section className="max-w-3xl">
        <h1 className="display-title text-4xl font-bold text-foreground sm:text-5xl">
          Terms and Conditions
        </h1>
        <p className="mt-5 leading-8 text-muted-foreground">
          These terms apply when you submit a program registration or use
          Questura Academy services. By submitting a registration, you confirm
          that the information provided is accurate and that Questura may
          contact you about program participation, scheduling, safety, and
          confirmation details.
        </p>
      </section>

      <section className="mt-10 grid gap-6">
        {[
          {
            title: 'Registration Review',
            body: 'Submitting a form does not guarantee placement. Questura may review eligibility, program capacity, and submitted details before confirming participation.',
          },
          {
            title: 'Participant Information',
            body: 'Guardians are responsible for providing accurate participant and contact information, including any notes that may affect participation or accessibility.',
          },
          {
            title: 'Program Communication',
            body: 'Questura may contact guardians by email or phone about registration status, program updates, preparation details, and urgent program matters.',
          },
          {
            title: 'Updates',
            body: 'Questura may update these terms as programs and operations change. The terms shown at the time of submission apply to that registration.',
          },
        ].map((section) => (
          <article
            key={section.title}
            className="rounded-md border border-border bg-background/80 p-5 shadow-[0_18px_34px_rgba(23,58,64,0.08)]"
          >
            <h2 className="text-xl font-extrabold text-foreground">
              {section.title}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}

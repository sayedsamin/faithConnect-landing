import { ChevronDown } from 'lucide-react'

import { contactFaqs } from './contact-data'

export function ContactFaq() {
  return (
    <section
      className="page-shell py-16 sm:py-20"
      aria-labelledby="contact-faq-title"
    >
      <div
        className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"
        data-contact-reveal="up"
      >
        <div>
          <h2
            id="contact-faq-title"
            className="text-3xl leading-tight font-extrabold text-brand-dark sm:text-4xl"
          >
            Before you reach out
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-dark/62">
            A few quick answers can help direct your inquiry to the right
            FaithConnect team.
          </p>
        </div>

        <div className="grid gap-3">
          {contactFaqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-lg border border-brand-blue/10 bg-white px-5 py-4 shadow-sm"
            >
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20 [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  className="size-5 shrink-0 text-brand-blue transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-6 text-brand-dark/62">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

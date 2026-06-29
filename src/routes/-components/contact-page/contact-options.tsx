import { ArrowRight } from 'lucide-react'

import { contactOptions } from './contact-data'

export function ContactOptions() {
  return (
    <section
      className="page-shell py-16 sm:py-20"
      aria-labelledby="contact-options-title"
    >
      <div className="max-w-2xl" data-contact-reveal="up">
        <h2
          id="contact-options-title"
          className="text-3xl font-extrabold text-brand-dark sm:text-4xl"
        >
          How can our team help?
        </h2>
        <p className="mt-4 text-base leading-7 text-brand-dark/62">
          Choose the conversation that best matches what you need from
          GraceNexa.
        </p>
      </div>

      <div
        className="mt-8 grid gap-5 md:grid-cols-3"
        data-contact-reveal="stagger"
      >
        {contactOptions.map((option) => (
          <article
            key={option.title}
            className="contact-motion-item feature-card flex min-h-72 flex-col rounded-xl border border-brand-blue/10 bg-white p-6 shadow-[0_16px_38px_rgb(0_14_53/0.06)]"
          >
            <span className="grid size-14 place-items-center rounded-full bg-brand-blue/8">
              <img
                src={option.iconSrc}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="size-7 object-contain"
                aria-hidden="true"
                draggable={false}
              />
            </span>
            <h3 className="mt-5 text-xl font-extrabold text-brand-dark">
              {option.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-brand-dark/62">
              {option.description}
            </p>
            <a
              href={`mailto:${option.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-md text-sm font-extrabold text-brand-blue no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
            >
              {option.action}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

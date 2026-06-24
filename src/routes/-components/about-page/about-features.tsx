import { sectionIconImageClass, sectionIconShellClass } from './about-styles'
import { getFeatureRevealClass, useFeatureReveal } from './feature-reveal'

export function AboutFeatures() {
  const { ref, visibleStep } = useFeatureReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="relative left-1/2 w-screen -translate-x-1/2 border-y border-brand-blue/8 bg-brand-blue/[0.025] py-16"
      aria-labelledby="features-title"
    >
      <div className="about-features-reveal relative mx-auto w-full max-w-6xl overflow-hidden px-4 pr-6 sm:px-6 sm:pr-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8 lg:pr-10 xl:pr-12">
        <div
          aria-hidden="true"
          className="absolute right-8 top-10 hidden h-36 w-36 rounded-full border border-brand-blue/15 lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute left-[42%] top-16 hidden h-24 w-24 bg-[radial-gradient(circle,var(--brand-blue)_1px,transparent_1px)] bg-[length:10px_10px] opacity-20 lg:block"
        />
        <div className="about-features-copy relative z-10 lg:pl-8 xl:pl-12">
          <span
            className={`${getFeatureRevealClass(1, visibleStep)} ${sectionIconShellClass} rounded-full bg-brand-blue/8 text-brand-blue`}
          >
            <img
              src="/images/about/church.webp"
              alt=""
              aria-hidden="true"
              className={sectionIconImageClass}
            />
          </span>
          <h2
            id="features-title"
            className={`${getFeatureRevealClass(2, visibleStep)} mt-4 text-2xl font-extrabold text-brand-dark`}
          >
            Built for modern ministry
          </h2>
          <p
            className={`${getFeatureRevealClass(3, visibleStep)} mt-4 max-w-lg text-sm leading-6 font-semibold text-brand-dark/62`}
          >
            Churches need better tools to manage ministry operations without the
            complexity. FaithConnect was created to simplify administration,
            unify communication, and help leaders focus on what matters most:
            people.
          </p>
          <p
            className={`${getFeatureRevealClass(4, visibleStep)} mt-3 max-w-lg text-sm leading-6 font-semibold text-brand-dark/62`}
          >
            From the first connection to lifelong engagement, we make it easy to
            serve, support, and grow your community.
          </p>
        </div>

        <div
          className={`${getFeatureRevealClass(5, visibleStep)} about-features-media relative z-10 mt-8 lg:mt-0`}
        >
          <img
            src="/images/about/member-overview.webp"
            alt="FaithConnect member overview and recent activity dashboard preview"
            width={1920}
            height={802}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl border border-brand-blue/10 bg-white object-cover shadow-[0_18px_44px_rgb(0_14_53/0.08)]"
          />
        </div>
      </div>
    </section>
  )
}

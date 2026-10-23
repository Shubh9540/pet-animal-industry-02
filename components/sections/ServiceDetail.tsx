import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';
import { ServiceDetailProps } from '@/types/templates.types';

export const ServiceDetail = ({ data }: ServiceDetailProps) => {
  if (!data) return null;

  const service = data.services.find((item) => item.id === data.canonicalServiceId);
  if (!service) return null;

  return (
    <section className="w-full bg-[var(--color-white)]">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
        <div className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[430px] lg:h-[500px]">
          <Image src={service.image} alt={service.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-accent-light)] sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent-light)]" />
            <span>{service.subtitle}</span>
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">
            <span className="block">{service.heading}</span>
            {service.highlightedHeading && <span className="block text-[var(--color-accent-light)]">{service.highlightedHeading}</span>}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-text-light)] sm:text-lg sm:leading-8">{service.description}</p>

          <div className="relative mt-7 space-y-5 before:absolute before:bottom-5 before:left-3 before:top-5 before:w-px before:bg-[var(--color-border-soft)]">
            {service.highlights.slice(0, 3).map((highlight) => (
              <div key={highlight.id} className="relative flex gap-5">
                <span className="relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full border-[7px] border-[var(--color-surface-soft)] bg-[var(--color-accent-light)]" />
                <div>
                  <h2 className="font-heading text-lg font-bold text-[var(--color-heading)] sm:text-xl">{highlight.title}</h2>
                  {highlight.description && <p className="mt-1 text-sm leading-6 text-[var(--color-text-light)] sm:text-base">{highlight.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {service.steps?.length && service.processBadge && service.processTitle && service.processHighlightedTitle ? (
        <div className="w-full bg-[var(--color-service-process-bg)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mx-auto w-full max-w-[1240px]">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-accent-light)] sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent-light)]" />
                <span>{service.processBadge}</span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
                <span className="block">{service.processTitle}</span>
                <span className="block text-[var(--color-accent-light)]">{service.processHighlightedTitle}</span>
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-10">
              {service.steps.map((step) => (
                <article key={step.id} className="overflow-hidden rounded-2xl bg-[var(--color-white)] p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-5">
                  <p className="font-heading text-base font-bold text-[var(--color-heading)]">{step.number}</p>
                  <span aria-hidden="true" className="mt-1 block h-0.5 w-10 bg-[var(--color-primary)]" />
                  <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={step.image} alt={step.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="px-2 pb-2 pt-5 text-center">
                    <h3 className="font-heading text-lg font-bold text-[var(--color-heading)] sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)] sm:text-base">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {service.advantages?.length && service.advantageBadge && service.advantageTitle && service.advantageHighlightedTitle ? (
        <div className="relative w-full overflow-hidden bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <FaPaw aria-hidden="true" className="pointer-events-none absolute -left-10 top-16 hidden -rotate-12 text-[190px] text-[var(--color-service-decoration)] lg:block" />
          <div className="relative mx-auto w-full max-w-[1240px]">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-accent-light)] sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent-light)]" />
                <span>{service.advantageBadge}</span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
                <span className="block">{service.advantageTitle}</span>
                <span className="block text-[var(--color-accent-light)]">{service.advantageHighlightedTitle}</span>
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
              {service.advantages.map((advantage) => (
                <article key={advantage.id} className="overflow-hidden rounded-2xl bg-[var(--color-service-card-blue)] shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={advantage.image} alt={advantage.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-[var(--color-heading)] sm:text-xl">{advantage.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">{advantage.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

import Link from 'next/link';
import { FaArrowRight, FaCut, FaHome, FaPaw, FaStethoscope, FaSyringe } from 'react-icons/fa';
import { OurServiceProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaStethoscope': return <FaStethoscope aria-hidden="true" />;
    case 'FaSyringe': return <FaSyringe aria-hidden="true" />;
    case 'FaCut': return <FaCut aria-hidden="true" />;
    case 'FaHome': return <FaHome aria-hidden="true" />;
    default: return <FaPaw aria-hidden="true" />;
  }
};

export const OurService = ({ data, limit }: OurServiceProps) => {
  if (!data?.services.length) return null;

  const visibleServices = typeof limit === 'number' ? data.services.slice(0, limit) : data.services;

  return (
    <section id="our-services" className="relative w-full overflow-hidden bg-[var(--color-white)] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -right-16 top-6 hidden rotate-[18deg] text-[230px] text-[var(--color-surface-soft)] sm:block lg:-right-10 lg:top-5 lg:text-[300px]" />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mx-auto grid w-full max-w-[1175px] grid-cols-1 gap-8 lg:min-h-[285px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-light)] sm:text-sm">
              <span>{data.subtitle}</span>
              <span aria-hidden="true" className="h-px w-16 bg-[var(--color-accent-light)] sm:w-24" />
            </div>
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[var(--color-primary)] sm:text-5xl lg:text-7xl">
              <span className="block">{data.titleLine1}</span>
              <span className="block">{data.titleLine2}</span>
              <span className="block text-[var(--color-accent-light)]">{data.highlightedTitle}</span>
            </h2>
          </div>
          <div className="relative z-10 flex flex-col items-start lg:pt-16">
            <p className="max-w-[470px] text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{data.description}</p>
            <Link href={data.linkUrl} className="mt-5 inline-flex h-12 min-w-[230px] items-center justify-between gap-5 rounded-full bg-[var(--color-primary)] px-6 text-sm font-semibold text-[var(--color-white)] transition-colors hover:bg-[var(--color-primary-light)] sm:h-14 sm:min-w-[280px] sm:px-8 sm:text-base lg:h-16 lg:min-w-80 lg:px-10 lg:text-lg">
              <span>{data.linkText}</span>
              <FaArrowRight aria-hidden="true" className="text-xl" />
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          {visibleServices.map((service) => (
            <Link key={service.id} href={service.url} className="group block border-b border-[var(--color-border-soft)] py-6 transition-colors hover:bg-[var(--color-surface-hover-subtle)] sm:py-7 lg:py-8">
              <div className="grid grid-cols-[36px_40px_minmax(0,1fr)_44px] items-center gap-x-3 gap-y-3 lg:grid-cols-[64px_64px_minmax(0,1.15fr)_1px_minmax(0,1fr)_60px] lg:gap-x-6 xl:gap-x-8">
                <span className="text-sm font-semibold text-[var(--color-service-number)] sm:text-base lg:text-2xl">{service.number}</span>
                <span className="flex items-center justify-center text-xl text-[var(--color-primary)] sm:text-2xl lg:text-4xl">{renderIcon(service.icon)}</span>
                <span className="min-w-0 text-base font-semibold leading-snug text-[var(--color-primary)] sm:text-lg lg:text-2xl">{service.title}</span>
                <span aria-hidden="true" className="hidden h-16 w-px bg-[var(--color-border-soft)] lg:block" />
                <span className="col-start-2 col-span-2 text-sm leading-5 text-[var(--color-text-subtle)] sm:text-base sm:leading-6 lg:col-auto lg:text-lg lg:leading-7">{service.description}</span>
                <span aria-hidden="true" className="row-start-1 col-start-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-primary)] text-base text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-white)] sm:h-11 sm:w-11 lg:col-auto lg:row-auto lg:h-14 lg:w-14 lg:text-xl">
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

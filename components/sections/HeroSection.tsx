import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaPaw } from 'react-icons/fa';
import { HeroSectionProps } from '@/types/templates.types';

export const HeroSection = ({ data }: HeroSectionProps) => {
  if (!data) return null;

  return (
    <section className="relative isolate w-full overflow-hidden bg-[var(--color-white)]">
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -right-28 -top-52 hidden rotate-12 text-[430px] text-[var(--color-surface-tint)] sm:block lg:-right-20 lg:-top-60 lg:text-[520px]" />
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 hidden -rotate-12 text-[240px] text-[var(--color-secondary)] sm:block" />

      <div className="relative mx-auto flex min-h-[620px] w-full max-w-[1440px] flex-col items-center px-5 pb-8 pt-8 sm:px-8 lg:min-h-[560px] lg:flex-row lg:items-stretch lg:px-12 lg:pb-0 lg:pt-0 xl:min-h-[600px]">
        <h1 className="relative z-20 mt-4 w-full max-w-xl text-center text-5xl font-extrabold leading-[0.94] tracking-[-0.055em] text-[var(--color-primary)] sm:text-6xl lg:absolute lg:left-[5%] lg:top-[24%] lg:mt-0 lg:w-[34%] lg:text-left lg:text-7xl xl:text-8xl">
          <span className="block">{data.titleLine1}</span>
          <span className="block">{data.titleLine2}</span>
          <span className="block text-[var(--color-accent-light)]">{data.highlightedTitle}</span>
        </h1>

        <div className="relative z-10 mt-3 h-[340px] w-full max-w-[460px] sm:h-[410px] lg:absolute lg:-bottom-14 lg:left-1/2 lg:mt-0 lg:h-[600px] lg:w-[54%] lg:max-w-none lg:-translate-x-1/2 xl:-bottom-16 xl:h-[660px]">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            priority
            sizes="(max-width: 1023px) 90vw, 54vw"
            className="object-contain object-bottom"
          />
          <span aria-hidden="true" className="absolute right-[13%] top-[15%] z-10 h-4 w-1 rotate-[32deg] rounded-full bg-[var(--color-primary)] lg:h-5" />
          <span aria-hidden="true" className="absolute right-[7%] top-[20%] z-10 h-5 w-1 rotate-[58deg] rounded-full bg-[var(--color-primary)] lg:h-6" />
        </div>

        <div className="relative z-20 mt-2 flex w-full max-w-sm flex-col items-center gap-4 text-center sm:mt-3 lg:absolute lg:right-[4%] lg:top-[63%] lg:mt-0 lg:w-[22%] lg:items-start lg:text-left xl:right-[5%] xl:top-[65%]">
          <p className="text-base leading-6 text-[var(--color-text)] sm:text-lg sm:leading-7">
            {data.trustLead} <span className="font-bold text-[var(--color-primary)]">{data.trustHighlight}</span>
          </p>
          <div className="flex items-center gap-3">
            <span aria-label={data.ctaIconLabel} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-2xl text-[var(--color-white)]">
              <FaPaw aria-hidden="true" />
            </span>
            <Link href={data.ctaUrl} className="flex h-12 items-center gap-3 whitespace-nowrap rounded-full border border-[var(--color-primary)] px-4 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-active)] sm:text-sm">
              <span>{data.ctaText}</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

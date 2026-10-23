import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPaw } from 'react-icons/fa';
import { CareProps } from '@/types/templates.types';

export const Care = ({ data }: CareProps) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-2xl lg:min-h-[420px] lg:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative flex min-h-[320px] flex-col items-start justify-center overflow-hidden bg-[var(--color-surface-soft)] px-7 py-9 sm:px-10 sm:py-12 lg:min-h-[420px] lg:px-12 xl:px-14">
          <FaPaw aria-hidden="true" className="pointer-events-none absolute -bottom-7 -right-8 rotate-[-18deg] text-[190px] text-[var(--color-care-decoration)] sm:text-[230px]" />
          <div className="relative z-10 mb-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-light)] sm:text-sm">
            <span aria-hidden="true" className="h-px w-12 bg-[var(--color-accent-light)] sm:w-14" />
            <span>{data.eyebrow}</span>
          </div>
          <h2 className="relative z-10 max-w-xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-[var(--color-primary)] sm:text-5xl xl:text-6xl">
            <span className="block">{data.title}</span>
            <span className="block text-[var(--color-accent-light)]">{data.highlightedTitle}</span>
          </h2>
          <p className="relative z-10 mt-5 max-w-xl text-base leading-7 text-[var(--color-text-muted)] sm:mt-6 sm:text-lg sm:leading-8">
            {data.description}
          </p>
          <Link
            href={data.buttonUrl}
            aria-label={data.arrowLabel}
            className="relative z-10 mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)] text-2xl text-[var(--color-white)] transition-colors hover:bg-[var(--color-primary-light)] sm:mt-10 sm:h-20 sm:w-20"
          >
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

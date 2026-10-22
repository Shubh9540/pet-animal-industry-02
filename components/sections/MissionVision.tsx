import Image from 'next/image';
import { MissionVisionProps } from '@/types/templates.types';

export const MissionVision = ({ data }: MissionVisionProps) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[var(--color-bg-alt)] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--color-primary)]" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-primary)] sm:text-sm">{data.eyebrow}</p>
          </div>

          <h2 className="mt-5 font-heading text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">
            {data.title} <span className="text-[var(--color-primary-light)]">{data.highlightedTitle}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-light)] sm:text-lg sm:leading-8">{data.description}</p>

          <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
            <article>
              <div className="flex items-center gap-5">
                <h3 className="shrink-0 font-heading text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)] sm:text-3xl">
                  {data.missionTitle} <span className="text-[var(--color-primary-light)]">{data.missionHighlightedTitle}</span>
                </h3>
                <span className="h-px w-12 bg-[var(--color-primary)] sm:w-16" />
              </div>
              <p className="mt-3 max-w-2xl pl-6 text-sm leading-6 text-[var(--color-text-light)] sm:mt-4 sm:pl-16 sm:text-base sm:leading-7">{data.missionDescription}</p>
            </article>

            <article>
              <div className="flex items-center gap-5">
                <h3 className="shrink-0 font-heading text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)] sm:text-3xl">
                  {data.visionTitle} <span className="text-[var(--color-primary-light)]">{data.visionHighlightedTitle}</span>
                </h3>
                <span className="h-px w-12 bg-[var(--color-primary)] sm:w-16" />
              </div>
              <p className="mt-3 max-w-2xl pl-6 text-sm leading-6 text-[var(--color-text-light)] sm:mt-4 sm:pl-16 sm:text-base sm:leading-7">{data.visionDescription}</p>
            </article>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(5,53,38,0.10)] lg:max-w-none">
          <div className="relative aspect-[5/6] w-full animate-fade-in-up">
            <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';
import { OurTeamProps } from '@/types/templates.types';

export const OurTeam = ({ data }: OurTeamProps) => {
  if (!data?.members.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--color-team-decoration)] blur-sm sm:h-80 sm:w-80 lg:-left-40 lg:h-[440px] lg:w-[440px]" />
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -right-12 top-24 hidden rotate-12 text-[210px] text-[var(--color-team-decoration)] lg:block" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-team-badge)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-light)] sm:text-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-accent-light)]" />
              {data.eyebrow}
            </span>
          </div>

          <h2 className="mt-4 flex flex-col gap-2 font-heading text-3xl font-bold leading-[1.12] tracking-[-0.04em] text-[var(--color-heading)] sm:gap-3 sm:text-4xl lg:text-5xl">
            <span className="block">{data.title}</span>
            <span className="block leading-[1.15] text-[var(--color-accent-light)]">{data.highlightedTitle}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">
            {data.description}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-4 xl:gap-5">
          {data.members.map((member) => (
            <article key={member.id} className="group overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-white)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-team-image-bg)]">
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-5 pb-6 pt-5 text-center">
                <h3 className="font-heading text-xl font-bold leading-tight text-[var(--color-heading)] lg:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-1 text-base font-semibold text-[var(--color-accent-light)]">
                  {member.role}
                </p>
                <span aria-hidden="true" className="mx-auto mt-4 block h-0.5 w-10 bg-[var(--color-accent-light)]" />
                <p className="mt-4 text-sm leading-6 text-[var(--color-text-light)]">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

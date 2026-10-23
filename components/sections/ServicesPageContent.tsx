import Image from 'next/image';
import Link from 'next/link';
import { FaPaw } from 'react-icons/fa';
import { ServicesPageContentProps } from '@/types/templates.types';

export const ServicesPageContent = ({ data }: ServicesPageContentProps) => {
  if (!data?.cards.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -right-12 top-10 hidden rotate-12 text-[180px] text-[var(--color-service-decoration)] lg:block" />

      <div className="relative mx-auto w-full max-w-[1240px]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-light)] sm:text-sm">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--color-accent-light)]" />
            <span>{data.eyebrow}</span>
            <span aria-hidden="true" className="h-px w-10 bg-[var(--color-accent-light)]" />
          </div>
          <h2 className="mt-4 flex flex-col gap-2 font-heading text-3xl font-bold leading-[1.12] tracking-[-0.04em] text-[var(--color-heading)] sm:gap-3 sm:text-4xl lg:text-5xl">
            <span className="block">{data.title}</span>
            <span className="block leading-[1.15] text-[var(--color-accent-light)]">{data.highlightedTitle}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">
            {data.description}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5">
          {data.cards.map((card, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <Link
                key={card.id}
                href={card.url}
                className={`group grid min-h-[280px] grid-cols-1 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 ${index % 2 === 0 ? 'bg-[var(--color-service-card-blue)]' : 'bg-[var(--color-service-card-cream)]'}`}
              >
                <div className={`relative min-h-[220px] sm:min-h-[260px] md:min-h-[240px] xl:min-h-[280px] ${imageFirst ? 'sm:order-1 md:order-1 xl:order-1' : 'sm:order-2 md:order-1 xl:order-2'}`}>
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className={`flex min-h-[220px] flex-col justify-center p-6 sm:min-h-[260px] sm:p-7 md:min-h-[220px] xl:min-h-[280px] ${imageFirst ? 'sm:order-2 md:order-2 xl:order-2' : 'sm:order-1 md:order-2 xl:order-1'}`}>
                  <h3 className="font-heading text-2xl font-bold leading-tight text-[var(--color-heading)] lg:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-light)] sm:text-base">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

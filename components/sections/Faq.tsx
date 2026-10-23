'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaqProps } from '@/types/templates.types';

export const Faq = ({ data }: FaqProps) => {
  const [activeId, setActiveId] = useState<string | null>(data?.items[0]?.id ?? null);

  if (!data?.items.length) return null;

  return (
    <section className="w-full overflow-hidden bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
        <div>
          <div className="flex items-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-faq-badge)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-light)] sm:text-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-accent-light)]" />
              {data.subtitle}
            </span>
          </div>

          <h2 className="mt-4 flex flex-col gap-2 font-heading text-3xl font-bold leading-[1.12] tracking-[-0.04em] text-[var(--color-heading)] sm:gap-3 sm:text-4xl lg:text-5xl">
            <span className="block">{data.title1}</span>
            <span className="block leading-[1.15] text-[var(--color-accent-light)]">{data.highlightedTitle}</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">
            {data.description}
          </p>

          <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-3xl sm:mt-8">
            <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-[82%] w-[82%] -translate-x-1/2 rounded-full bg-[var(--color-faq-image-bg)]" />
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {data.items.map((item) => {
            const isOpen = activeId === item.id;

            return (
              <article key={item.id} className={`overflow-hidden rounded-xl border transition-colors duration-300 ${isOpen ? 'border-[var(--color-faq-active-border)] bg-[var(--color-faq-card-active)]' : 'border-[var(--color-border-soft)] bg-[var(--color-white)]'}`}>
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-answer`}
                  aria-label={isOpen ? `${data.collapseLabel}: ${item.question}` : `${data.expandLabel}: ${item.question}`}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left sm:gap-4 sm:px-4 sm:py-3.5"
                >
                  <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-11 sm:w-11 sm:text-base ${isOpen ? 'bg-[var(--color-accent-light)] text-[var(--color-white)]' : 'bg-[var(--color-faq-number-bg)] text-[var(--color-accent-light)]'}`}>
                    {item.number}
                  </span>
                  <span className="flex-1 font-heading text-sm font-bold leading-5 text-[var(--color-heading)] sm:text-base sm:leading-6">
                    {item.question}
                  </span>
                  <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm transition-colors ${isOpen ? 'bg-[var(--color-accent-light)] text-[var(--color-white)]' : 'bg-[var(--color-faq-icon)] text-[var(--color-accent-light)]'}`}>
                    {isOpen ? <FaMinus aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
                  </span>
                </button>

                <div id={`${item.id}-answer`} className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 pl-16 pr-4 text-sm leading-6 text-[var(--color-text-light)] sm:pl-20 sm:pr-14 sm:text-base sm:leading-7">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

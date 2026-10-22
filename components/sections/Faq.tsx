'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaqProps } from '@/types/templates.types';

export const Faq = ({ data }: FaqProps) => {
  const [activeId, setActiveId] = useState<string | null>(data?.items[0]?.id ?? null);

  if (!data?.items.length) return null;

  return (
    <section className="w-full bg-[var(--color-bg-alt)] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-10 lg:mb-12">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--color-primary)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{data.subtitle}</p>
            <span className="h-px w-10 bg-[var(--color-primary)]" />
          </div>
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
            {data.title1}{' '}
            <span className="text-[var(--color-primary)]">{data.highlightedTitle}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[520px] lg:h-[760px]">
            <Image src={data.image} alt={data.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain" />
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            {data.items.map((item, index) => {
              const isOpen = activeId === item.id;

              return (
                <article key={item.id} className={`overflow-hidden rounded-xl transition-colors duration-300 ${isOpen ? 'bg-[#edf6ff]' : 'bg-[#edf6ff]/70'}`}>
                  <button
                    type="button"
                    onClick={() => setActiveId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    aria-label={isOpen ? `${data.collapseLabel}: ${item.question}` : `${data.expandLabel}: ${item.question}`}
                    className={`flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors duration-300 sm:px-5 ${isOpen ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-heading)] hover:bg-[#e6f2ff]'}`}
                  >
                    <span className="text-sm font-semibold">{index + 1}.</span>
                    <span className="flex-1 font-heading text-base font-semibold leading-6 sm:text-lg">{item.question}</span>
                    <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm ${isOpen ? 'bg-white text-[var(--color-primary)]' : 'bg-[#dcecff] text-[var(--color-primary)]'}`}>{isOpen ? <FaMinus aria-hidden="true" /> : <FaPlus aria-hidden="true" />}</span>
                  </button>
                  <div id={`${item.id}-answer`} className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 pt-3 text-sm leading-6 text-[var(--color-text-light)] sm:px-5 sm:pb-5 sm:text-base sm:leading-7">{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


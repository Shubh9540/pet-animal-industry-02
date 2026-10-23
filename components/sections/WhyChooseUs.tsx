'use client';

import Image from 'next/image';
import { WhyChooseUsProps } from '@/types/templates.types';

export const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-white)] py-12 lg:py-16">
      {/* Subtle organic background decoration */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[var(--color-why-decoration-left)] blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-[var(--color-why-decoration-right)] blur-3xl opacity-80" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {data.badge && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-why-badge-bg)] px-4 py-1.5 text-xs font-semibold text-[var(--color-why-accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-why-accent)]" />
              <span>{data.badge}</span>
            </div>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-why-heading)] sm:text-4xl lg:text-[44px] lg:leading-[1.2]">
            {data.title}{' '}
            <span className="text-[var(--color-why-accent)]">{data.highlightedTitle}</span>
          </h2>

          {data.description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-why-description)] sm:text-base">
              {data.description}
            </p>
          )}
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {data.features.map((feature) => (
            <div
              key={feature.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[26px] bg-[var(--color-surface-hover-subtle)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Content */}
              <div className="flex flex-col p-6 sm:p-7">
                {/* Blue Accent Pill Line */}
                <span className="h-1 w-9 rounded-full bg-[var(--color-why-accent)]" />

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold text-[var(--color-why-card-title)] lg:text-xl">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-why-card-description)]">
                  {feature.description}
                </p>
              </div>

              {/* Card Image */}
              {feature.image && (
                <div className="relative mt-2 h-44 w-full overflow-hidden rounded-b-[26px] sm:h-48">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt || feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

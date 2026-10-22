import React from 'react';
import Link from 'next/link';
import { BreadcrumbProps } from '@/types/templates.types';

export const Breadcrumb = ({ data, ui }: BreadcrumbProps) => {
  if (!data || !ui) return null;

  return (
    <section className="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="flex min-h-72 flex-col items-center justify-center bg-[var(--color-primary)] px-6 py-12 text-center sm:min-h-80 md:min-h-[420px] md:px-10 lg:min-h-[480px] lg:px-12">
        <h1 className="font-heading text-4xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {data.title}
        </h1>

        <nav aria-label="Breadcrumb" className="mt-8 flex max-w-full flex-wrap items-center justify-center gap-4 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-base font-medium text-white sm:text-lg">
          {data.paths.map((path, index) => (
            <React.Fragment key={path.id}>
              {path.url ? (
                <Link href={path.url} className="transition-colors duration-300 hover:text-[var(--color-secondary)]">
                  {path.label}
                </Link>
              ) : (
                <span className="font-semibold">{path.label}</span>
              )}
              {index < data.paths.length - 1 && <span aria-hidden="true" className="text-white/70">{ui.breadcrumbSeparator}</span>}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div
        role="img"
        aria-label={data.title}
        className="min-h-64 bg-cover bg-center md:min-h-[420px] lg:min-h-[480px]"
        style={ui.breadcrumbImage ? { backgroundImage: `url('${ui.breadcrumbImage}')` } : undefined}
      />
    </section>
  );
};

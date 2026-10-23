import React from 'react';
import { BreadcrumbProps } from '@/types/templates.types';
import { FaChevronDown } from 'react-icons/fa';

export const Breadcrumb = ({ data }: BreadcrumbProps) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[var(--color-bg-alt)] py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[var(--color-heading)] tracking-tight">
        {data.title}
      </h1>
      <div className="mt-4 flex items-center justify-center text-[var(--color-text)] opacity-70">
        <FaChevronDown className="w-3.5 h-3.5" />
      </div>
    </section>
  );
};

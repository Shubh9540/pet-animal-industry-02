'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaAward, FaShieldAlt, FaProjectDiagram, FaTruck } from 'react-icons/fa';
import { WhyChooseUsProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaAward':
      return <FaAward />;
    case 'FaShieldAlt':
      return <FaShieldAlt />;
    case 'FaProjectDiagram':
      return <FaProjectDiagram />;
    case 'FaTruck':
      return <FaTruck />;
    default:
      return null;
  }
};

export const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!data) return;

    if (shouldReduceMotion) {
      setVisibleFeatures(new Set(data.features.map((feature) => feature.id)));
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const enteringIds = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target instanceof HTMLElement ? entry.target.dataset.featureId : undefined)
          .filter((id): id is string => Boolean(id));

        if (enteringIds.length) {
          setVisibleFeatures((current) => new Set([...current, ...enteringIds]));
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    section.querySelectorAll('[data-feature-id]').forEach((feature) => observer.observe(feature));
    return () => observer.disconnect();
  }, [data, shouldReduceMotion]);

  if (!data) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#f8fbff] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--color-primary)]" />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">{data.subtitle}</p>
          </div>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#0b2f70] sm:text-5xl lg:text-6xl">
            {data.title}{' '}
            <span className="text-[var(--color-primary)]">{data.highlightedTitle}</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {data.features.map((feature, index) => {
            const isVisible = shouldReduceMotion || visibleFeatures.has(feature.id);
            const iconBackground = index % 4 === 0
              ? 'bg-[#e3f1ff]'
              : index % 4 === 1
                ? 'bg-[#d9ecff]'
                : index % 4 === 2
                  ? 'bg-[#d7ebff]'
                  : 'bg-[#d8eaff]';

            return (
              <article
                key={feature.id}
                data-feature-id={feature.id}
                className={`grid grid-cols-[64px_40px_minmax(0,1fr)] items-center gap-4 border-b border-[#b9dcff] py-9 transition-all duration-700 ease-out last:border-b-0 sm:grid-cols-[96px_48px_minmax(0,1fr)] sm:gap-6 sm:py-10 lg:gap-8 lg:py-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                <span className={`flex h-16 w-16 items-center justify-center rounded-[22px] text-3xl text-[#0b2f70] sm:h-24 sm:w-24 sm:text-4xl ${iconBackground}`}>
                  {renderIcon(feature.icon)}
                </span>
                <span className="self-start pt-1 text-xs text-[#8190a8] sm:text-sm">/{feature.number}</span>
                <div className="grid min-w-0 grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_1px_minmax(92px,0.55fr)] sm:gap-5 lg:gap-8">
                  <h3 className="text-xl font-medium leading-tight tracking-[-0.03em] text-[#0b2f70] sm:text-2xl lg:text-4xl">{feature.title}</h3>
                  <span className="hidden h-10 w-px bg-[#b9dcff] sm:block" />
                  <p className="text-sm leading-6 text-[#0b3d91] sm:text-base sm:leading-7">{feature.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

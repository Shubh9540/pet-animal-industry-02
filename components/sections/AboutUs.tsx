'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useReducedMotion } from 'framer-motion';
import { AboutUsProps } from '@/types/templates.types';

export const AboutUs = ({ data, showButton = true }: AboutUsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  if (!data) return null;

  const revealClass = isVisible || shouldReduceMotion ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0';

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-white)] px-5 py-8 sm:px-8 lg:pb-14 lg:pt-28">
      <div className="mx-auto grid w-full max-w-[1260px] grid-cols-1 items-center gap-7 sm:gap-8 lg:grid-cols-[1.35fr_0.92fr_1fr] lg:gap-8 xl:gap-10">
        <div className={`flex flex-col items-center text-center transition-all duration-700 ease-out lg:self-start lg:items-start lg:pt-2 lg:text-left ${revealClass}`}>
          <div className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-light)] sm:text-base">
            <span>{data.eyebrow}</span>
            <span aria-hidden="true" className="h-px w-16 bg-[var(--color-accent-light)] sm:w-20" />
          </div>
          <h2 className="text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-[var(--color-primary)] sm:text-6xl xl:text-7xl">
            <span className="block">{data.titleLine1}</span>
            <span className="block">{data.titleLine2} <span className="text-[var(--color-accent-light)]">{data.highlightedTitle}</span></span>
          </h2>
        </div>

        <div className={`relative mx-auto aspect-[5/8] w-full max-w-[340px] overflow-hidden transition-all delay-150 duration-700 ease-out lg:max-w-none ${revealClass}`}>
          <Image
            src={data.imageMain}
            alt={data.imageMainAlt}
            fill
            sizes="(max-width: 1023px) 90vw, 27vw"
            className="object-cover object-center"
          />
        </div>

        <div className={`flex flex-col items-center text-center transition-all delay-300 duration-700 ease-out lg:translate-y-12 lg:items-start lg:text-left ${revealClass}`}>
          <p className="text-base leading-7 text-[var(--color-navigation)] sm:text-lg sm:leading-8">{data.description}</p>
          {showButton && data.buttonText && data.buttonUrl && (
            <Link href={data.buttonUrl} className="mt-6 inline-flex h-12 items-center gap-4 rounded-full bg-[var(--color-primary)] px-6 text-sm font-semibold text-[var(--color-white)] transition-colors hover:bg-[var(--color-primary-light)]">
              <span>{data.buttonText}</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

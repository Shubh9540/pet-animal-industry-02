'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { FaBath, FaCalendarAlt, FaCheck, FaClipboardList, FaDog, FaHandshake, FaHeart, FaHome, FaPaw, FaStethoscope, FaUsers } from 'react-icons/fa';
import { ServiceDetailProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaBath': return <FaBath />;
    case 'FaCalendarAlt': return <FaCalendarAlt />;
    case 'FaClipboardList': return <FaClipboardList />;
    case 'FaDog': return <FaDog />;
    case 'FaHandshake': return <FaHandshake />;
    case 'FaHeart': return <FaHeart />;
    case 'FaHome': return <FaHome />;
    case 'FaPaw': return <FaPaw />;
    case 'FaStethoscope': return <FaStethoscope />;
    case 'FaUsers': return <FaUsers />;
    default: return <FaPaw />;
  }
};

export const ServiceDetail = ({ data, serviceId }: ServiceDetailProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const service = data?.services.find((item) => item.id === serviceId);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !service) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>('[data-service-reveal]'));
    if (shouldReduceMotion) {
      setVisibleSections(new Set(targets.map((target) => target.dataset.serviceReveal).filter((id): id is string => Boolean(id))));
      return;
    }

    setVisibleSections(new Set());
    const observer = new IntersectionObserver(
      (entries) => {
        const enteringIds = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target instanceof HTMLElement ? entry.target.dataset.serviceReveal : undefined)
          .filter((id): id is string => Boolean(id));

        const leavingIds = entries
          .filter((entry) => !entry.isIntersecting)
          .map((entry) => entry.target instanceof HTMLElement ? entry.target.dataset.serviceReveal : undefined)
          .filter((id): id is string => Boolean(id));

        if (enteringIds.length || leavingIds.length) {
          setVisibleSections((current) => {
            const next = new Set(current);
            enteringIds.forEach((id) => next.add(id));
            leavingIds.forEach((id) => next.delete(id));
            return next;
          });
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [service, shouldReduceMotion, serviceId]);

  if (!data || !service) return null;

  const overviewImageId = `${service.id}-overview-image`;
  const overviewContentId = `${service.id}-overview-content`;
  const offersId = `${service.id}-offers`;
  const benefitsId = `${service.id}-benefits`;
  const revealClass = (id: string) => visibleSections.has(id) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-bg-alt)]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div data-service-reveal={overviewImageId} className={`relative h-[360px] overflow-hidden rounded-[28px] transition-all duration-700 ease-out sm:h-[460px] lg:h-[600px] ${revealClass(overviewImageId)}`}>
          <Image src={service.image} alt={service.imageAlt} fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          <span className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-3xl text-white shadow-lg sm:h-20 sm:w-20"><FaPaw aria-hidden="true" /></span>
        </div>

        <div data-service-reveal={overviewContentId} className={`transition-all duration-700 ease-out ${revealClass(overviewContentId)}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-primary)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] sm:text-sm">{service.subtitle}</p>
          </div>
          <h1 className="mt-5 max-w-2xl font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">{service.heading}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-light)] sm:text-lg sm:leading-8">{service.description}</p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {service.highlights.map((highlight) => (
              <div key={highlight.id} className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary)]/35 text-2xl text-[var(--color-primary)] sm:h-16 sm:w-16">{renderIcon(highlight.icon)}</span>
                <p className="text-base font-medium leading-6 text-[var(--color-heading)] sm:text-lg">{highlight.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div data-service-reveal={`${offersId}-content`} className={`transition-all duration-700 ease-out ${revealClass(`${offersId}-content`)}`}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-primary)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] sm:text-sm">{service.offerSubtitle}</p>
            </div>
            <h2 className="mt-5 font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">{service.offerTitle}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-light)] sm:text-lg sm:leading-8">{service.offerDescription}</p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {service.offers.map((offer) => (
                <li key={offer.id} className="flex items-start gap-3 text-base leading-7 text-[var(--color-heading)] sm:text-lg">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs text-white"><FaCheck aria-hidden="true" /></span>
                  <span>{offer.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-service-reveal={`${offersId}-image`} className={`relative h-[320px] overflow-hidden rounded-[28px] transition-all duration-700 ease-out sm:h-[420px] lg:h-[540px] ${revealClass(`${offersId}-image`)}`}>
            <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            <FaPaw aria-hidden="true" className="absolute right-6 top-6 text-7xl text-white/80 drop-shadow sm:right-8 sm:top-8 sm:text-8xl" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div data-service-reveal={`${benefitsId}-image`} className={`relative h-[360px] overflow-hidden rounded-[28px] transition-all duration-700 ease-out sm:h-[460px] lg:h-[560px] ${revealClass(`${benefitsId}-image`)}`}>
          <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          <FaPaw aria-hidden="true" className="absolute bottom-6 left-6 text-7xl text-white/85 drop-shadow sm:bottom-8 sm:left-8 sm:text-8xl" />
        </div>

        <div data-service-reveal={`${benefitsId}-content`} className={`transition-all duration-700 ease-out ${revealClass(`${benefitsId}-content`)}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-primary)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] sm:text-sm">{service.closingSubtitle}</p>
          </div>
          <h2 className="mt-5 max-w-2xl font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">{service.closingTitle}</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-light)] sm:text-lg sm:leading-8">{service.closingDescription}</p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {service.highlights.map((highlight) => (
              <li key={highlight.id} className="flex items-center gap-3 text-base font-medium leading-7 text-[var(--color-heading)] sm:text-lg">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm text-white"><FaCheck aria-hidden="true" /></span>
                <span>{highlight.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
};

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { OurTeamProps } from '@/types/templates.types';

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return FaFacebookF;
    case 'instagram': return FaInstagram;
    case 'linkedin': return FaLinkedinIn;
    default: return null;
  }
};

export const OurTeam = ({ data }: OurTeamProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [visibleMembers, setVisibleMembers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!data) return;
    if (shouldReduceMotion) {
      setVisibleMembers(new Set(data.members.map((member) => member.id)));
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      const enteringIds = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target instanceof HTMLElement ? entry.target.dataset.teamMember : undefined)
        .filter((id): id is string => Boolean(id));
      const leavingIds = entries
        .filter((entry) => !entry.isIntersecting)
        .map((entry) => entry.target instanceof HTMLElement ? entry.target.dataset.teamMember : undefined)
        .filter((id): id is string => Boolean(id));

      if (enteringIds.length || leavingIds.length) {
        setVisibleMembers((current) => {
          const next = new Set(current);
          enteringIds.forEach((id) => next.add(id));
          leavingIds.forEach((id) => next.delete(id));
          return next;
        });
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    section.querySelectorAll('[data-team-member]').forEach((member) => observer.observe(member));
    return () => observer.disconnect();
  }, [data, shouldReduceMotion]);

  if (!data) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-bg-alt)] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
          <div className="mb-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-8 bg-[var(--color-primary)] sm:w-10" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] sm:text-sm">{data.subtitle}</p>
            <span className="h-px w-8 bg-[var(--color-primary)] sm:w-10" />
          </div>
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">{data.description}</p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {data.members.map((member) => {
            const isVisible = shouldReduceMotion || visibleMembers.has(member.id);

            return (
              <article key={member.id} data-team-member={member.id} className={`overflow-hidden rounded-xl bg-[var(--color-primary)] shadow-sm transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="relative aspect-[1/0.82] overflow-hidden sm:aspect-[1/0.86]">
                  <Image src={member.image} alt={member.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="min-h-36 px-4 pb-4 pt-3 text-white sm:px-5 sm:pb-5">
                  <h3 className="font-heading text-lg font-semibold leading-tight sm:text-xl">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-white/80">{member.role}</p>
                  <p className="mt-2 text-sm leading-5 text-white/90">{member.description}</p>
                  <div className="mt-3 flex items-center gap-2.5">
                    {member.socialLinks.map((social) => {
                      const Icon = getSocialIcon(social.platform);
                      if (!Icon) return null;
                      return (
                        <a key={social.id} href={social.url} aria-label={`${member.name} on ${social.platform}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-[var(--color-primary)] transition-colors hover:bg-[var(--color-secondary)]">
                          <Icon aria-hidden="true" />
                        </a>
                      );
                    })}
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

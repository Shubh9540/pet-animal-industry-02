'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { ContactProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaEnvelope': return <FaEnvelope aria-hidden="true" />;
    case 'FaMapMarkerAlt': return <FaMapMarkerAlt aria-hidden="true" />;
    case 'FaPhoneAlt': return <FaPhoneAlt aria-hidden="true" />;
    default: return null;
  }
};

export const Contact = ({ data }: ContactProps) => {
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  return (
    <section className="w-full overflow-hidden bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-7 lg:grid-cols-[0.9fr_0.7fr_1.1fr] lg:gap-0">
        <div className="lg:pr-8">
          <div className="flex items-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-contact-badge)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-light)] sm:text-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-accent-light)]" />
              {data.intro.eyebrow}
            </span>
          </div>

          <h2 className="mt-4 flex flex-col gap-2 font-heading text-3xl font-bold leading-[1.12] tracking-[-0.04em] text-[var(--color-heading)] sm:gap-3 sm:text-4xl lg:text-5xl">
            <span className="block">{data.intro.title}</span>
            <span className="block leading-[1.15] text-[var(--color-accent-light)]">{data.intro.highlightedTitle}</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">
            {data.intro.description}
          </p>

          <div className="mt-7 flex flex-col gap-6 sm:mt-8">
            {data.contactItems.map((item) => (
              <a key={item.id} href={item.url} className="group flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-contact-icon-bg)] text-xl text-[var(--color-accent-light)] transition-colors group-hover:bg-[var(--color-contact-icon-hover)] sm:h-14 sm:w-14 sm:text-2xl">
                  {renderIcon(item.icon)}
                </span>
                <span>
                  <span className="block font-heading text-base font-bold text-[var(--color-heading)] sm:text-lg">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--color-text-light)] sm:text-base">
                    {item.lines.map((line) => <span key={line.id} className="block">{line.text}</span>)}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="relative z-10 rounded-2xl border border-[var(--color-contact-card-border)] bg-[var(--color-white)] p-5 shadow-[var(--shadow-contact-card)] sm:p-6 lg:-mr-14 lg:mt-36">
          <h3 className="font-heading text-2xl font-bold text-[var(--color-heading)]">{data.form.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-light)]">{data.form.description}</p>

          <form className="mt-4 flex flex-col gap-3" onChange={() => setSubmitted(false)} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); }}>
            <input name="name" required placeholder={data.form.namePlaceholder} aria-label={data.form.namePlaceholder} className="w-full rounded-xl border border-[var(--color-border-form)] bg-[var(--color-contact-field-bg)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-placeholder)] focus:border-[var(--color-accent-light)]" />
            <input name="email" type="email" required placeholder={data.form.emailPlaceholder} aria-label={data.form.emailPlaceholder} className="w-full rounded-xl border border-[var(--color-border-form)] bg-[var(--color-contact-field-bg)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-placeholder)] focus:border-[var(--color-accent-light)]" />
            <input name="phone" type="tel" placeholder={data.form.phonePlaceholder} aria-label={data.form.phonePlaceholder} className="w-full rounded-xl border border-[var(--color-border-form)] bg-[var(--color-contact-field-bg)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-placeholder)] focus:border-[var(--color-accent-light)]" />
            <select name="service" required defaultValue="" aria-label={data.form.servicePlaceholder} className="w-full rounded-xl border border-[var(--color-border-form)] bg-[var(--color-contact-field-bg)] px-4 py-3 text-sm text-[var(--color-placeholder)] outline-none transition-colors focus:border-[var(--color-accent-light)]">
              <option value="" disabled>{data.form.servicePlaceholder}</option>
              {data.form.serviceOptions.map((option) => <option key={option.id} value={option.value}>{option.label}</option>)}
            </select>
            <textarea name="message" required rows={4} placeholder={data.form.messagePlaceholder} aria-label={data.form.messagePlaceholder} className="w-full resize-y rounded-xl border border-[var(--color-border-form)] bg-[var(--color-contact-field-bg)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-placeholder)] focus:border-[var(--color-accent-light)]" />

            <button type="submit" className="mt-1 inline-flex w-full items-center justify-center gap-4 rounded-xl bg-[var(--color-accent-light)] px-5 py-3.5 text-sm font-semibold text-[var(--color-white)] transition-colors hover:bg-[var(--color-accent-hover)]">
              <span>{data.form.buttonText}</span>
              <FaArrowRight aria-hidden="true" />
            </button>
            {submitted && <p role="status" className="text-sm leading-6 text-[var(--color-primary)]">{data.form.successMessage}</p>}
          </form>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-2xl sm:min-h-[560px] lg:min-h-[720px] lg:rounded-l-none">
          <Image src={data.visual.image} alt={data.visual.imageAlt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center" />
        </div>
      </div>
    </section>
  );
};

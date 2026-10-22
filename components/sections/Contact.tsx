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
    <>
      <section className="w-full bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 overflow-hidden rounded-2xl bg-[#f0f7ff] md:grid-cols-3">
          {data.contactItems.map((item) => (
            <a key={item.id} href={item.url} className="flex flex-col items-center justify-center px-5 py-6 text-center md:border-r md:border-[#dceaff] md:last:border-r-0 sm:py-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d9ecff] text-2xl text-[#4b9cff] sm:h-16 sm:w-16 sm:text-3xl">{renderIcon(item.icon)}</span>
              <h2 className="mt-1 font-heading text-xl font-semibold leading-tight text-[var(--color-heading)] sm:text-2xl">{item.title}</h2>
              <div className="mt-1 text-sm leading-6 text-[var(--color-heading)] sm:text-base">
                {item.lines.map((line) => <p key={line.id}>{line.text}</p>)}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="w-full bg-white px-5 pb-8 sm:px-8 lg:px-10 lg:pb-10">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-4 lg:grid-cols-[1.55fr_0.9fr] lg:gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(5,55,40,0.08)] sm:p-7 lg:p-9">
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)] sm:text-sm">{data.intro.eyebrow}</p>
              <span className="h-px w-8 bg-[#4b9cff]" />
            </div>
            <h1 className="mt-2 font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
              {data.form.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)] sm:text-base">{data.intro.description}</p>

            <form className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4" onChange={() => setSubmitted(false)} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); }}>
              <input name="name" required placeholder={data.form.namePlaceholder} aria-label={data.form.namePlaceholder} className="w-full rounded-xl border border-[#e0edff] bg-white px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:text-base" />
              <input name="phone" type="tel" placeholder={data.form.phonePlaceholder} aria-label={data.form.phonePlaceholder} className="w-full rounded-xl border border-[#e0edff] bg-white px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:text-base" />
              <input name="email" type="email" required placeholder={data.form.emailPlaceholder} aria-label={data.form.emailPlaceholder} className="w-full rounded-xl border border-[#e0edff] bg-white px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:text-base" />
              <input name="subject" required placeholder={data.form.subjectPlaceholder} aria-label={data.form.subjectPlaceholder} className="w-full rounded-xl border border-[#e0edff] bg-white px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:text-base" />
              <textarea name="message" required rows={4} placeholder={data.form.messagePlaceholder} aria-label={data.form.messagePlaceholder} className="w-full resize-y rounded-xl border border-[#e0edff] bg-white px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:col-span-2 sm:text-base" />
              <div className="flex flex-col items-start gap-3 sm:col-span-2">
                <button type="submit" className="inline-flex items-center gap-4 rounded-full bg-[#4b9cff] py-1.5 pl-6 pr-1.5 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#3d88e8] sm:text-base">
                  <span>{data.form.buttonText}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[var(--color-primary)]"><FaArrowRight aria-hidden="true" /></span>
                </button>
                {submitted && <p role="status" className="text-sm text-[var(--color-primary)]">{data.form.successMessage}</p>}
              </div>
            </form>
          </div>

          <div className="relative min-h-[380px] overflow-hidden rounded-2xl sm:min-h-[480px] lg:min-h-[560px]">
            <Image src={data.visual.image} alt={data.visual.imageAlt} fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-5 pb-10 sm:px-8 lg:px-10 lg:pb-14">
        <div className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-2xl">
          <iframe src={data.location.mapUrl} title={data.location.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0 sm:h-80 lg:h-[420px]" />
        </div>
      </section>
    </>
  );
};

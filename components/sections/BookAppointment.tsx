'use client';

import { useState } from 'react';
import { FaArrowRight, FaCalendarAlt, FaChevronDown, FaClock, FaCommentDots, FaDog, FaEnvelope, FaPaw, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { AppointmentFieldProps, BookAppointmentProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaCalendarAlt': return <FaCalendarAlt aria-hidden="true" />;
    case 'FaClock': return <FaClock aria-hidden="true" />;
    case 'FaCommentDots': return <FaCommentDots aria-hidden="true" />;
    case 'FaDog': return <FaDog aria-hidden="true" />;
    case 'FaEnvelope': return <FaEnvelope aria-hidden="true" />;
    case 'FaPhoneAlt': return <FaPhoneAlt aria-hidden="true" />;
    case 'FaUser': return <FaUser aria-hidden="true" />;
    default: return <FaPaw aria-hidden="true" />;
  }
};

const AppointmentField = ({ field }: AppointmentFieldProps) => (
    <label className={`block ${field.width === 'full' ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-sm font-semibold text-[var(--color-primary)] sm:text-base">{field.label}</span>
      <span className="relative block">
        <span className={`pointer-events-none absolute left-4 text-lg text-[#7486a0] ${field.type === 'textarea' ? 'top-4' : 'top-1/2 -translate-y-1/2'}`}>{renderIcon(field.icon)}</span>
        {field.type === 'select' ? (
          <select name={field.name} required={field.required} defaultValue="" className="w-full appearance-none rounded-xl border border-[#e2e5e7] bg-white py-3.5 pl-12 pr-10 text-sm text-[var(--color-heading)] outline-none transition-colors focus:border-[var(--color-primary)] sm:text-base">
            <option value="" disabled>{field.placeholder}</option>
            {field.options?.map((option) => <option key={option.id} value={option.value}>{option.title}</option>)}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea name={field.name} required={field.required} rows={3} placeholder={field.placeholder} className="min-h-24 w-full resize-y rounded-xl border border-[#e2e5e7] bg-white py-3.5 pl-12 pr-4 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:text-base" />
        ) : (
          <input name={field.name} type={field.type} required={field.required} placeholder={field.placeholder} className="w-full rounded-xl border border-[#e2e5e7] bg-white py-3.5 pl-12 pr-4 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[#8799b3] focus:border-[var(--color-primary)] sm:text-base" />
        )}
        {field.type === 'select' && <FaChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#7486a0]" />}
      </span>
    </label>
  );

export const BookAppointment = ({ data }: BookAppointmentProps) => {
  const [submitted, setSubmitted] = useState(false);
  if (!data) return null;

  return (
    <section className="w-full bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1120px]">
        <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <span className="inline-flex items-center gap-3 rounded-full bg-[#f0f7ff] px-4 py-2 text-sm font-semibold text-[#4b9cff] sm:text-base">
            {data.intro.eyebrow}
            <FaPaw aria-hidden="true" className="text-lg text-[var(--color-primary)]" />
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-primary)] sm:text-5xl lg:text-6xl">{data.intro.title}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-light)] sm:text-lg sm:leading-7">{data.intro.description}</p>
        </header>

        <form className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-5 shadow-[0_8px_36px_rgba(5,55,40,0.08)] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 sm:p-7 lg:p-9" onChange={() => setSubmitted(false)} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); }}>
          {data.form.fields.map((field) => <AppointmentField key={field.id} field={field} />)}
          <div className="flex flex-col items-center gap-3 sm:col-span-2">
            <button type="submit" className="inline-flex min-w-64 items-center justify-center gap-4 rounded-full bg-[#4b9cff] py-1.5 pl-7 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d88e8] sm:min-w-80 sm:text-base">
              <span>{data.form.buttonText}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#4b9cff]"><FaArrowRight aria-hidden="true" /></span>
            </button>
            {submitted && <p role="status" className="text-sm text-[var(--color-primary)]">{data.form.successMessage}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

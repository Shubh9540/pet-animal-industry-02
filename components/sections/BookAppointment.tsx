'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { AppointmentFieldProps, BookAppointmentProps } from '@/types/templates.types';

const AppointmentField = ({ field }: AppointmentFieldProps) => (
  <label className={`block ${field.width === 'full' ? 'sm:col-span-2' : ''}`}>
    <span className="sr-only">{field.label}</span>
    <span className="relative block">
      {field.type === 'select' ? (
        <>
          <select name={field.name} required={field.required} defaultValue="" className="w-full appearance-none rounded-xl border border-[var(--color-border-form)] bg-[var(--color-appointment-field-bg)] px-4 py-3.5 pr-10 text-sm text-[var(--color-text-light)] outline-none transition-colors focus:border-[var(--color-accent-light)] sm:text-base">
            <option value="" disabled>{field.placeholder}</option>
            {field.options?.map((option) => <option key={option.id} value={option.value}>{option.title}</option>)}
          </select>
          <FaChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-form-icon)]" />
        </>
      ) : field.type === 'textarea' ? (
        <textarea name={field.name} required={field.required} rows={4} placeholder={field.placeholder} className="min-h-28 w-full resize-y rounded-xl border border-[var(--color-border-form)] bg-[var(--color-appointment-field-bg)] px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent-light)] sm:text-base" />
      ) : (
        <input name={field.name} type={field.type} required={field.required} placeholder={field.placeholder} className="w-full rounded-xl border border-[var(--color-border-form)] bg-[var(--color-appointment-field-bg)] px-4 py-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent-light)] sm:text-base" />
      )}
    </span>
  </label>
);

export const BookAppointment = ({ data }: BookAppointmentProps) => {
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  return (
    <section className="w-full bg-[var(--color-white)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-[900px]">
        <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-light)] sm:text-sm">{data.intro.eyebrow}</span>
            <span aria-hidden="true" className="mt-3 h-0.5 w-12 bg-[var(--color-accent-light)]" />
          </div>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
            <span>{data.intro.title}</span>{' '}
            <span className="text-[var(--color-accent-light)]">{data.intro.highlightedTitle}</span>
          </h2>
        </header>

        <form className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--color-appointment-border)] bg-[var(--color-appointment-card-bg)] p-4 shadow-[var(--shadow-appointment-form)] sm:grid-cols-2 sm:gap-4 sm:p-6" onChange={() => setSubmitted(false)} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); }}>
          {data.form.fields.map((field) => <AppointmentField key={field.id} field={field} />)}

          <div className="flex flex-col items-center gap-3 sm:col-span-2">
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-accent-light)] px-5 py-3.5 text-sm font-semibold text-[var(--color-white)] transition-colors hover:bg-[var(--color-accent-hover)] sm:text-base">
              {data.form.buttonText}
            </button>
            {submitted && <p role="status" className="text-center text-sm leading-6 text-[var(--color-primary)]">{data.form.successMessage}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

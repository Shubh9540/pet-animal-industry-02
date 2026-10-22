'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPaw, FaQuoteRight, FaStar, FaArrowRight } from 'react-icons/fa';
import { TestimonialProps } from '@/types/templates.types';

export const Testimonial = ({ data }: TestimonialProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data?.testimonials.length) return null;

  const orderedTestimonials = data.testimonials.map((_, offset) => (
    data.testimonials[(activeIndex + offset) % data.testimonials.length]
  ));

  return (
    <section className="relative w-full overflow-hidden bg-[#f7fbff] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 rotate-[-25deg] text-[190px] text-[#e5f2ff] sm:text-[250px]" />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-4">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a9d0ff] bg-white/80 px-4 py-2 text-sm font-medium text-[#3287ed]">
              <FaPaw aria-hidden="true" />
              <span>{data.subtitle}</span>
            </div>
            <h2 className="mt-8 text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-[#0b3d91] sm:text-5xl lg:text-[2.75rem]">
              <span className="block">{data.title1}</span>
              <span className="block whitespace-nowrap text-[#4b9cff]">{data.highlightedTitle}</span>
            </h2>
          </div>
          <div className="relative flex min-h-[180px] flex-col items-start justify-start pt-10 lg:min-h-[13rem] lg:pt-16">
            <p className="relative z-10 max-w-[290px] text-xs leading-5 text-[#354b70] sm:text-sm sm:leading-5">{data.description}</p>
            <Link href={data.buttonUrl} className="relative z-10 mt-4 inline-flex h-10 items-center gap-5 rounded-full bg-[#0b3d91] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#1451aa] sm:mt-4 sm:h-11 sm:px-6 sm:text-sm">
              <span>{data.buttonText}</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
            <div className="pointer-events-none absolute -right-14 -top-8 hidden h-[255px] w-[350px] sm:block lg:-right-14 lg:top-[-10px] lg:h-[315px] lg:w-[410px]">
              <FaPaw aria-hidden="true" className="absolute right-8 top-0 rotate-[20deg] text-[150px] text-[#e9f4ff] lg:right-10 lg:text-[190px]" />
              <Image src={data.image} alt={data.imageAlt} fill sizes="(min-width: 1024px) 35vw, 40vw" className="object-contain object-bottom" />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
          {orderedTestimonials.map((testimonial, index) => (
            <article key={testimonial.id} className={`${index !== 0 ? 'hidden lg:block' : ''} relative min-h-[270px] rounded-2xl border border-white bg-white/95 p-6 shadow-[0_12px_35px_rgba(61,112,170,0.08)] sm:min-h-[290px] sm:p-7`}>
              <FaQuoteRight aria-hidden="true" className="absolute right-6 top-5 text-4xl text-[#dceeff] sm:right-7 sm:top-6 sm:text-5xl" />
              <div className="flex items-center gap-4 pr-10">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#edf6ff] sm:h-16 sm:w-16">
                  <Image src={testimonial.avatar} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-[#082c70] sm:text-lg">{testimonial.name}</h3>
                  <p className="mt-0.5 text-sm text-[#7588a6]">{testimonial.location}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1 text-sm text-[#ffbd00]" aria-hidden="true">
                {Array.from({ length: 5 }, (_, starIndex) => <FaStar key={`${testimonial.id}-star-${starIndex}`} aria-hidden="true" />)}
              </div>
              <p className="mt-5 text-[15px] leading-6 text-[#526684] sm:text-base sm:leading-[1.6]">{testimonial.quote}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5" aria-label={data.slideLabel}>
          {data.testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${data.slideLabel} ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-3 w-3 rounded-full transition-colors ${activeIndex === index ? 'bg-[#0b3d91]' : 'bg-[#cbd8e9] hover:bg-[#8fb8e8]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

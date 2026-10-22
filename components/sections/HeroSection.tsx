import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaPaw } from 'react-icons/fa';
import { HeroSectionProps } from '@/types/templates.types';

export const HeroSection = ({ data }: HeroSectionProps) => {
  if (!data) return null;

  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rotate-[-28deg] rounded-[42%] bg-[#f0f7ff] sm:h-80 sm:w-80 lg:right-[19%] lg:-top-36 lg:h-[390px] lg:w-[250px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-5rem] top-40 h-64 w-64 rotate-[38deg] rounded-[45%] bg-[#f0f7ff] sm:h-80 sm:w-80 lg:right-[-4rem] lg:top-24 lg:h-[300px] lg:w-[260px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-10 hidden h-28 w-28 rotate-[-30deg] rounded-[45%] bg-[#b9dcff] sm:block lg:bottom-8 lg:left-[-2rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-14 left-16 hidden h-20 w-20 rotate-[20deg] rounded-[45%] bg-[#b9dcff] sm:block lg:bottom-16 lg:left-[5.5rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 left-36 hidden h-24 w-24 rotate-[35deg] rounded-[45%] bg-[#b9dcff] sm:block lg:bottom-4 lg:left-[11rem]" />

      <div className="relative mx-auto flex min-h-[620px] w-full max-w-[1440px] flex-col items-center px-5 pb-8 pt-8 sm:px-8 lg:min-h-[520px] lg:flex-row lg:items-stretch lg:px-12 lg:pb-0 lg:pt-0 xl:min-h-[560px]">
        <h1 className="relative z-20 mt-4 w-full max-w-xl text-center text-5xl font-extrabold leading-[0.94] tracking-[-0.055em] text-[#0b3d91] sm:text-6xl lg:absolute lg:left-[5%] lg:top-[31%] lg:mt-0 lg:w-[32%] lg:text-left lg:text-6xl xl:text-7xl">
          <span className="block">{data.titleLine1}</span>
          <span className="block">{data.titleLine2}</span>
          <span className="block text-[#4b9cff]">{data.highlightedTitle}</span>
        </h1>

        <div className="relative z-10 mt-3 h-[340px] w-full max-w-[460px] sm:h-[410px] lg:absolute lg:bottom-[-50px] lg:left-1/2 lg:mt-0 lg:h-[560px] lg:w-[54%] lg:max-w-none lg:-translate-x-1/2 xl:bottom-[-64px] xl:h-[620px]">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            priority
            sizes="(max-width: 1023px) 90vw, 54vw"
            className="object-contain object-bottom"
          />
          <span aria-hidden="true" className="absolute right-[13%] top-[15%] z-10 h-4 w-1 rotate-[32deg] rounded-full bg-[#0b3d91] lg:h-5" />
          <span aria-hidden="true" className="absolute right-[7%] top-[20%] z-10 h-5 w-1 rotate-[58deg] rounded-full bg-[#0b3d91] lg:h-6" />
        </div>

        <div className="relative z-20 mt-2 flex w-full max-w-sm flex-col items-center gap-4 text-center sm:mt-3 lg:absolute lg:right-[4%] lg:top-[48%] lg:mt-0 lg:w-[22%] lg:items-start lg:text-left xl:right-[5%]">
          <p className="text-base leading-6 text-[#354969] sm:text-lg sm:leading-7">
            {data.trustLead} <span className="font-bold text-[#0b3d91]">{data.trustHighlight}</span>
          </p>
          <div className="flex items-center gap-3">
            <span aria-label={data.ctaIconLabel} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0b3d91] text-2xl text-white">
              <FaPaw aria-hidden="true" />
            </span>
            <Link href={data.ctaUrl} className="flex h-12 items-center gap-3 whitespace-nowrap rounded-full border border-[#0b3d91] px-4 text-xs font-semibold text-[#0b3d91] transition-colors hover:bg-[#e4f0ff] sm:text-sm">
              <span>{data.ctaText}</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

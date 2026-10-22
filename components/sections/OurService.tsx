import Link from 'next/link';
import { FaArrowRight, FaCut, FaHome, FaPaw, FaStethoscope, FaSyringe } from 'react-icons/fa';
import { OurServiceProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaStethoscope': return <FaStethoscope aria-hidden="true" />;
    case 'FaSyringe': return <FaSyringe aria-hidden="true" />;
    case 'FaCut': return <FaCut aria-hidden="true" />;
    case 'FaHome': return <FaHome aria-hidden="true" />;
    default: return <FaPaw aria-hidden="true" />;
  }
};

export const OurService = ({ data, limit }: OurServiceProps) => {
  if (!data?.services.length) return null;

  const visibleServices = typeof limit === 'number' ? data.services.slice(0, limit) : data.services;

  return (
    <section id="our-services" className="relative w-full overflow-hidden bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <FaPaw aria-hidden="true" className="pointer-events-none absolute -right-4 top-10 hidden rotate-[18deg] text-[190px] text-[#edf6ff] sm:block lg:right-0 lg:top-12 lg:text-[220px]" />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <div className="mb-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#4b9cff] sm:text-sm">
              <span>{data.subtitle}</span>
              <span aria-hidden="true" className="h-px w-16 bg-[#4b9cff] sm:w-24" />
            </div>
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[#0b3d91] sm:text-5xl lg:text-6xl">
              <span className="block">{data.titleLine1}</span>
              <span className="block">{data.titleLine2}</span>
              <span className="block text-[#4b9cff]">{data.highlightedTitle}</span>
            </h2>
          </div>
          <div className="relative z-10 flex flex-col items-start pb-1 lg:pb-2">
            <p className="max-w-xl text-base leading-7 text-[#647997] sm:text-lg sm:leading-8">{data.description}</p>
            <Link href={data.linkUrl} className="mt-5 inline-flex h-12 min-w-[230px] items-center justify-between gap-5 rounded-full bg-[#0b3d91] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1451aa] sm:h-14 sm:min-w-[280px] sm:px-8 sm:text-base lg:h-16 lg:min-w-[300px] lg:px-10 lg:text-lg">
              <span>{data.linkText}</span>
              <FaArrowRight aria-hidden="true" className="text-xl" />
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          {visibleServices.map((service) => (
            <Link key={service.id} href={service.url} className="group block border-b border-[#dceaff] py-6 transition-colors hover:bg-[#f8fbff] sm:py-7 lg:py-8">
              <div className="grid grid-cols-[36px_40px_minmax(0,1fr)_44px] items-center gap-x-3 gap-y-3 lg:grid-cols-[64px_64px_minmax(0,1.15fr)_1px_minmax(0,1fr)_60px] lg:gap-x-6 xl:gap-x-8">
                <span className="text-sm font-semibold text-[#89a7cf] sm:text-base lg:text-2xl">{service.number}</span>
                <span className="flex items-center justify-center text-xl text-[#0b3d91] sm:text-2xl lg:text-4xl">{renderIcon(service.icon)}</span>
                <span className="min-w-0 text-base font-semibold leading-snug text-[#0b3d91] sm:text-lg lg:text-2xl">{service.title}</span>
                <span aria-hidden="true" className="hidden h-16 w-px bg-[#dceaff] lg:block" />
                <span className="col-start-2 col-span-2 text-sm leading-5 text-[#7185a2] sm:text-base sm:leading-6 lg:col-auto lg:text-lg lg:leading-7">{service.description}</span>
                <span aria-hidden="true" className="row-start-1 col-start-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#0b3d91] text-base text-[#0b3d91] transition-colors group-hover:bg-[#0b3d91] group-hover:text-white sm:h-11 sm:w-11 lg:col-auto lg:row-auto lg:h-14 lg:w-14 lg:text-xl">
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

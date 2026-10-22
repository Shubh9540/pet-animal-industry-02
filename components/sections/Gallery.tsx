'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaPaw, FaTimes } from 'react-icons/fa';
import { GalleryImageProps, GalleryProps } from '@/types/templates.types';

const GalleryImage = ({ item, index, openLabel, onOpen }: GalleryImageProps) => (
  <button
    type="button"
    onClick={() => onOpen(index)}
    aria-label={`${openLabel}: ${item.imageAlt}`}
    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-[var(--color-bg-alt)]"
  >
    <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
  </button>
);

export const Gallery = ({ data }: GalleryProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredImages = data?.images.filter((item) => activeCategory === 'all' || item.category === activeCategory) ?? [];
  const pageCount = Math.max(1, Math.ceil(filteredImages.length / (data?.itemsPerPage ?? 1)));
  const pageImages = filteredImages.slice((currentPage - 1) * (data?.itemsPerPage ?? 1), currentPage * (data?.itemsPerPage ?? 1));
  const activeImage = activeIndex === null ? null : filteredImages[activeIndex] ?? null;

  useEffect(() => {
    if (activeIndex === null || !data) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? 0 : (index - 1 + filteredImages.length) % filteredImages.length);
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? 0 : (index + 1) % filteredImages.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, data, filteredImages.length]);

  if (!data?.images.length) return null;

  const showPrevious = () => setActiveIndex((index) => index === null ? 0 : (index - 1 + filteredImages.length) % filteredImages.length);
  const showNext = () => setActiveIndex((index) => index === null ? 0 : (index + 1) % filteredImages.length);
  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setActiveIndex(null);
  };

  return (
    <section className="w-full bg-[var(--color-bg-alt)] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="relative mx-auto mb-8 max-w-4xl text-center sm:mb-10 lg:mb-12">
          <FaPaw aria-hidden="true" className="pointer-events-none absolute -left-2 top-8 hidden -rotate-12 text-6xl text-[#e1efff] sm:block lg:-left-10 lg:text-8xl" />
          <FaPaw aria-hidden="true" className="pointer-events-none absolute -right-2 top-8 hidden rotate-12 text-6xl text-[#e1efff] sm:block lg:-right-10 lg:text-8xl" />
          <div className="mb-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-8 bg-[var(--color-primary)] sm:w-10" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] sm:text-sm">{data.subtitle}</p>
            <span className="h-px w-8 bg-[var(--color-primary)] sm:w-10" />
          </div>
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl lg:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-light)] sm:text-base sm:leading-7">{data.description}</p>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5 sm:mb-8 sm:gap-3">
          {data.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => changeCategory(category.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:min-w-28 sm:px-6 ${activeCategory === category.id ? 'bg-[var(--color-primary)] text-white' : 'bg-[#edf6ff] text-[var(--color-heading)] hover:bg-[#e7f3ff]'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {pageImages.map((item, index) => (
            <GalleryImage key={item.id} item={item} index={(currentPage - 1) * data.itemsPerPage + index} openLabel={data.openLabel} onOpen={setActiveIndex} />
          ))}
        </div>

        {pageCount > 1 && (
          <nav aria-label={data.pageLabel} className="mt-8 flex items-center justify-center gap-2 sm:mt-10">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <button key={page} type="button" aria-label={`${data.pageLabel} ${page}`} aria-current={page === currentPage ? 'page' : undefined} onClick={() => { setCurrentPage(page); setActiveIndex(null); }} className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors ${page === currentPage ? 'bg-[var(--color-primary)] text-white' : 'bg-[#edf6ff] text-[var(--color-heading)] hover:bg-[#e7f3ff]'}`}>
                {page}
              </button>
            ))}
            <button type="button" aria-label={data.nextLabel} disabled={currentPage === pageCount} onClick={() => { setCurrentPage((page) => Math.min(pageCount, page + 1)); setActiveIndex(null); }} className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#edf6ff] px-3 text-[var(--color-heading)] transition-colors hover:bg-[#e7f3ff] disabled:cursor-not-allowed disabled:opacity-40">
              <FaChevronRight aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={activeImage.imageAlt}>
          <button type="button" onClick={() => setActiveIndex(null)} aria-label={data.closeLabel} className="absolute inset-0 cursor-default" />
          <div className="relative z-10 h-[70vh] w-full max-w-5xl sm:h-[80vh]">
            <Image src={activeImage.image} alt={activeImage.imageAlt} fill sizes="100vw" className="object-contain" priority />
            <button type="button" onClick={() => setActiveIndex(null)} aria-label={data.closeLabel} className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-[var(--color-primary)] shadow-lg transition-colors hover:bg-[#edf6ff]"><FaTimes aria-hidden="true" /></button>
            <button type="button" onClick={showPrevious} aria-label={data.previousLabel} className="absolute left-0 top-1/2 flex h-12 w-12 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-lg transition-colors hover:bg-[#edf6ff] sm:-translate-x-5"><FaChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={showNext} aria-label={data.nextLabel} className="absolute right-0 top-1/2 flex h-12 w-12 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-lg transition-colors hover:bg-[#edf6ff] sm:translate-x-5"><FaChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      )}
    </section>
  );
};

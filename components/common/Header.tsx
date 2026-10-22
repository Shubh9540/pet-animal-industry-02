'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '@/types/templates.types';
import { FaArrowRight, FaBars, FaCalendarAlt, FaHeart, FaPhoneAlt, FaTimes } from 'react-icons/fa';

export const Header = ({ data }: HeaderProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  if (!data) return null;

  const navLinks = [...(data.navLinksLeft || []), ...(data.navLinksRight || [])];
  const isActive = (url: string) => url === '/' ? pathname === '/' : pathname === url || pathname.startsWith(`${url}/`);
  const appointmentButton = (
    <>
      <FaCalendarAlt className="shrink-0 text-sm" />
      <span>{data.contactButton.text}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 text-sm">
        <FaArrowRight />
      </span>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5f1ff] bg-white px-4 sm:px-6 xl:px-5">
      <div className="mx-auto flex h-[72px] w-full max-w-[1380px] items-center justify-between lg:h-[82px] xl:h-[90px]">
        <Link href={data.logoUrl} aria-label={data.logoAlt} className="flex shrink-0 items-center xl:hidden">
          <img src={data.logo} alt={data.logoAlt} className="h-auto w-[150px] object-contain sm:w-[172px]" />
        </Link>

        <nav aria-label={data.logoAlt} className="hidden shrink-0 items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const active = isActive(link.url);
            return (
              <Link
                key={link.id}
                href={link.url}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-3 text-[13px] font-semibold transition-colors 2xl:px-4 2xl:text-sm ${active ? 'bg-[#e4f0ff] text-[#0b3d91]' : 'text-[#13264a] hover:bg-[#e4f0ff] hover:text-[#0b3d91]'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href={data.logoUrl} aria-label={data.logoAlt} className="hidden shrink-0 items-center xl:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          <img src={data.logo} alt={data.logoAlt} className="h-auto w-[170px] object-contain 2xl:w-[180px]" />
        </Link>

        <div className="hidden shrink-0 items-center gap-3 xl:flex 2xl:gap-4">
          <a href={data.phoneUrl} className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4f0ff] text-lg text-[#0b55ad]"><FaPhoneAlt /></span>
            <span className="flex flex-col">
              <span className="text-sm font-bold leading-5 text-[#0b3d91] 2xl:text-base">{data.phoneNumber}</span>
              <span className="text-[10px] leading-4 text-[#536b8f] 2xl:text-[11px]">{data.phoneCaption}</span>
            </span>
          </a>
          <Link href={data.favoritesUrl} aria-label={data.favoritesLabel} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b55ad] text-xl text-white transition-colors hover:bg-[#4b9cff]">
            <FaHeart />
          </Link>
          <Link href={data.contactButton.url} className="flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-[#0b55ad] pl-4 pr-2 text-xs font-semibold text-white transition-colors hover:bg-[#4b9cff] 2xl:gap-3 2xl:pl-5 2xl:text-sm">
            <FaCalendarAlt className="shrink-0 text-sm" />
            <span>{data.contactButton.text}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"><FaArrowRight /></span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? data.closeMenuLabel : data.openMenuLabel}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-xl text-[var(--color-primary)] shadow-sm transition-colors hover:bg-[#e4f0ff] xl:hidden"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full flex max-h-[calc(100vh-4.5rem)] flex-col overflow-y-auto rounded-b-2xl border border-t-0 border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-mobile-menu)] xl:hidden">
          <Link href={data.logoUrl} aria-label={data.logoAlt} className="mb-3 flex justify-center">
            <img src={data.logo} alt={data.logoAlt} className="h-auto w-[170px] object-contain" />
          </Link>
          {navLinks.map((link) => {
            const active = isActive(link.url);
            return (
              <Link
                key={link.id}
                href={link.url}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-3.5 text-base font-semibold transition-colors ${active ? 'bg-[#e4f0ff] text-[#0b3d91]' : 'text-[#13264a] hover:bg-[#e4f0ff] hover:text-[#0b3d91]'}`}
              >
                {link.label}
              </Link>
            );
          })}
          <a href={data.phoneUrl} className="mt-3 flex items-center gap-3 px-4 py-2 text-[#0b3d91]">
            <FaPhoneAlt />
            <span className="flex flex-col">
              <span className="text-sm font-bold">{data.phoneNumber}</span>
              <span className="text-xs text-[#536b8f]">{data.phoneCaption}</span>
            </span>
          </a>
          <Link href={data.contactButton.url} onClick={() => setMobileMenuOpen(false)} className="mt-3 flex h-12 items-center justify-center gap-3 rounded-full bg-[#0b55ad] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#4b9cff]">
            {appointmentButton}
          </Link>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FooterProps } from '@/types/templates.types';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const renderSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaFacebookF': return <FaFacebookF />;
    case 'FaLinkedinIn': return <FaLinkedinIn />;
    case 'FaYoutube': return <FaYoutube />;
    case 'FaTwitter': return <FaTwitter />;
    case 'FaInstagram': return <FaInstagram />;
    case 'FaPinterestP': return <FaPinterestP />;
    default: return null;
  }
};

const renderContactIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaMapMarkerAlt': return <FaMapMarkerAlt />;
    case 'FaPhoneAlt': return <FaPhoneAlt />;
    case 'FaEnvelope': return <FaEnvelope />;
    default: return null;
  }
};

export const Footer = ({ data }: FooterProps) => {
  if (!data) return null;

  return (
    <footer className="bg-[#edf4ff]">

      {/* Top — Logo + Pet Image */}
      <div className="flex flex-col items-center pt-10 pb-0 relative overflow-hidden">

        {/* Paw print watermark — left side */}
        <svg
          viewBox="0 0 200 220"
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-[180px] h-[200px] md:w-[220px] md:h-[240px] pointer-events-none select-none z-0"
          fill="#c6dffa"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="100" cy="150" rx="55" ry="48" />
          <ellipse cx="48" cy="90" rx="22" ry="28" transform="rotate(-15 48 90)" />
          <ellipse cx="100" cy="68" rx="20" ry="26" />
          <ellipse cx="148" cy="90" rx="22" ry="28" transform="rotate(15 148 90)" />
        </svg>

        {/* Logo */}
        <Link href={data.logoUrl} className="inline-block mb-4 z-10">
          <Image
            src={data.logo}
            alt={data.logoAlt}
            width={180}
            height={70}
            className="object-contain"
          />
        </Link>

        {/* Pet Image — peeks over the columns */}
        <div className="relative z-10 -mb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.footerImage}
            alt={data.footerImageAlt}
            className="object-contain w-[260px] md:w-[340px] lg:w-[420px] mx-auto"
          />
        </div>
      </div>

      {/* Divider line above columns */}
      <div className="border-t border-[#c7ddf7]" />

      {/* Three Columns */}
      <div className="max-w-[1100px] mx-auto px-4 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#c7ddf7]">

          {/* CONTACT */}
          <div className="px-0 md:px-8 pb-8 md:pb-0">
            <h4 className="text-xs font-bold tracking-[0.18em] text-[#0b3d91] uppercase mb-4 flex items-center gap-2">
              {data.contactTitle}
              <span className="flex-1 h-px bg-[#4b9cff] max-w-[40px]" />
            </h4>
            <ul className="flex flex-col gap-4">
              {data.contactItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  {/* Icon bubble */}
                  <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-[#0b3d91] shadow-sm text-sm">
                    {renderContactIcon(item.icon)}
                  </span>
                  {item.url ? (
                    <a
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[#354969] hover:text-[#0b3d91] transition-colors duration-200 text-sm leading-snug mt-1.5"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[#354969] text-sm leading-snug mt-1.5">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* MENU */}
          <div className="px-0 md:px-8 py-8 md:py-0">
            <h4 className="text-xs font-bold tracking-[0.18em] text-[#0b3d91] uppercase mb-4 flex items-center gap-2">
              {data.quickLinksTitle}
              <span className="flex-1 h-px bg-[#4b9cff] max-w-[40px]" />
            </h4>
            <ul className="flex flex-col gap-2.5">
              {data.quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="text-[#354969] hover:text-[#0b3d91] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="px-0 md:px-8 pt-8 md:pt-0">
            <h4 className="text-xs font-bold tracking-[0.18em] text-[#0b3d91] uppercase mb-4 flex items-center gap-2">
              {data.socialTitle}
              <span className="flex-1 h-px bg-[#4b9cff] max-w-[40px]" />
            </h4>
            <ul className="flex flex-col gap-3">
              {data.socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-[#0b3d91] shadow-sm text-sm group-hover:bg-[#0b3d91] group-hover:text-white transition-colors duration-200">
                      {renderSocialIcon(social.icon)}
                    </span>
                    <span className="text-[#354969] group-hover:text-[#0b3d91] transition-colors duration-200 text-sm">
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-[#c7ddf7]">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8 py-4 text-center">
          <p className="text-xs text-[#6b7f9d]">{data.copyrightText}</p>
        </div>
      </div>

    </footer>
  );
};

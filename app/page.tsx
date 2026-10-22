import React from 'react';
import { PetTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { Header } from '@/components/common/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutUs } from '@/components/sections/AboutUs';
import { OurService } from '@/components/sections/OurService';
import { Care } from '@/components/sections/Care';
import { Testimonial } from '@/components/sections/Testimonial';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="bg-[var(--color-bg-main)] min-h-screen flex flex-col">
      <div className="contents">

        <Header data={sectionData.Header?.variants?.PetHeader2} />
        <HeroSection data={sectionData.Hero?.variants?.PetHero2} />
      </div>
      <AboutUs data={sectionData.AboutUs?.variants?.PetAboutUs2} />
      <OurService data={sectionData.OurService?.variants?.PetOurService2} />
      <Care data={sectionData.Care?.variants?.PetCare2} />
      <Testimonial data={sectionData.Testimonials?.variants?.PetTestimonials2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

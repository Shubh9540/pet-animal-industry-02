import React from 'react';
import { PetTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import rawData from '@/data/templates.json';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { AboutUs } from '@/components/sections/AboutUs';
import { MissionVision } from '@/components/sections/MissionVision';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function Page() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="bg-[var(--color-bg-main)] min-h-screen flex flex-col">
      <div className="contents">

        <Header data={sectionData.Header?.variants?.PetHeader2} />
        <Breadcrumb data={commonData.aboutBreadcrumb} ui={commonData.globalUI} />
      </div>
      <AboutUs data={sectionData.AboutUs?.variants?.PetAboutUs2} />
      <MissionVision data={sectionData.MissionVision?.variants?.PetMissionVision2} />
      <WhyChooseUs data={sectionData.whyChooseUs?.variants?.PetAboutWhyChooseUs2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

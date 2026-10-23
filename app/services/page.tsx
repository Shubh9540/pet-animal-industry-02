import React from 'react';
import { PetTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ServicesPageContent } from '@/components/sections/ServicesPageContent';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-white)]">
      <div className="contents">

        <Header data={sectionData.Header?.variants?.PetHeader2} />
        <Breadcrumb data={commonData.servicesBreadcrumb} ui={commonData.globalUI} />
      </div>
      <ServicesPageContent data={sectionData.ServicesPage?.variants?.PetServicesPage2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

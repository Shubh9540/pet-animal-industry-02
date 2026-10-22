import React from 'react';
import { PetTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { NotFoundSection } from '@/components/sections/NotFoundSection';

export default function NotFoundPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="bg-[var(--color-white)] min-h-screen flex flex-col">

      <Header data={sectionData.Header?.variants?.PetHeader2} />
      
      <NotFoundSection data={commonData.notFound} />

      <Footer data={commonData.Footer} />
    </main>
  );
}

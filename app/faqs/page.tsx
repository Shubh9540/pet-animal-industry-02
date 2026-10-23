import rawData from '@/data/templates.json';
import { PetTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function FaqsPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-white)]">
      <Header data={sectionData.Header?.variants?.PetHeader2} />
      <Breadcrumb data={commonData.faqsBreadcrumb} ui={commonData.globalUI} />
      <Faq data={sectionData.Faq?.variants?.PetFaq2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

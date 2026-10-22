import rawData from '@/data/templates.json';
import { PetTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Pricing } from '@/components/sections/Pricing';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function PricingPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-bg-alt)]">
      <Header data={sectionData.Header?.variants?.PetHeader2} />
      <Breadcrumb data={commonData.pricingBreadcrumb} ui={commonData.globalUI} />
      <Pricing data={sectionData.Pricing?.variants?.PetPricing2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

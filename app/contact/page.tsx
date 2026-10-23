import { PetTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="bg-[var(--color-white)]">
      <Header data={sectionData.Header?.variants?.PetHeader2} />
      <Breadcrumb data={commonData.contactBreadcrumb} ui={commonData.globalUI} />
      <Contact data={sectionData.contact?.variants?.PetContact2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

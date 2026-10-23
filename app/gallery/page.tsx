import rawData from '@/data/templates.json';
import { PetTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Gallery } from '@/components/sections/Gallery';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-white)]">
      <Header data={sectionData.Header?.variants?.PetHeader2} />
      <Breadcrumb data={commonData.galleryBreadcrumb} ui={commonData.globalUI} />
      <Gallery data={sectionData.Gallery?.variants?.PetGallery2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

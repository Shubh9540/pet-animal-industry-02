import rawData from '@/data/templates.json';
import { PetTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ServiceDetail } from '@/components/sections/ServiceDetail';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function ServiceDetailsPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData?.categories?.Pet?.sections;
  const commonData = templateData?.common;
  const detailData = sectionData?.ServiceDetail?.variants?.PetServiceDetail2;
  const service = detailData?.services.find((item) => item.id === detailData.canonicalServiceId);

  if (!sectionData || !commonData || !detailData || !service) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-white)]">
      <Header data={sectionData.Header?.variants?.PetHeader2} />
      <Breadcrumb data={service.breadcrumb} ui={commonData.globalUI} />
      <ServiceDetail data={detailData} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

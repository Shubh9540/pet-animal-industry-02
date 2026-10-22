import rawData from '@/data/templates.json';
import { PetTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { BookAppointment } from '@/components/sections/BookAppointment';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function BookAnAppointmentPage() {
  const templateData: PetTemplateData = rawData;
  const sectionData = templateData.categories.Pet.sections;
  const commonData = templateData.common;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-white)]">

      <Header data={sectionData.Header?.variants?.PetHeader2} />
      <Breadcrumb data={commonData.bookAppointmentBreadcrumb} ui={commonData.globalUI} />
      <BookAppointment data={sectionData.BookAppointment?.variants?.PetBookAppointment2} />
      <Footer data={commonData.Footer} />
    </main>
  );
}

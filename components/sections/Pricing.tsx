import { FaBath, FaLeaf, FaPaw, FaRibbon, FaStar } from 'react-icons/fa';
import { PriceTableProps, PricingProps } from '@/types/templates.types';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaBath': return <FaBath />;
    case 'FaLeaf': return <FaLeaf />;
    case 'FaRibbon': return <FaRibbon />;
    case 'FaStar': return <FaStar />;
    default: return <FaPaw />;
  }
};

const PriceTable = ({ data }: PriceTableProps) => (
  <section className="relative w-full overflow-hidden rounded-2xl border border-[#e1efff] bg-white p-3 shadow-sm sm:p-5 lg:p-6">
    <FaPaw aria-hidden="true" className="pointer-events-none absolute right-6 top-2 hidden text-7xl text-[#e7f3ff] sm:block" />
    {data.eyebrow && (
      <div className="mb-2 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-[var(--color-primary)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] sm:text-sm">{data.eyebrow}</p>
        <span className="h-px w-8 bg-[var(--color-primary)]" />
      </div>
    )}
    <h2 className="relative z-10 mb-4 text-center font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-primary)] sm:mb-5 sm:text-4xl lg:text-5xl">{data.title}</h2>
    <div className="overflow-x-auto rounded-xl border border-[#e0edff]">
      <table className="w-full min-w-[680px] border-collapse text-left sm:min-w-0">
        <thead>
          <tr className="bg-[var(--color-primary)] text-white">
            {data.columns.map((column) => (
              <th key={column.id} scope="col" className="border-r border-white/20 px-4 py-3 text-center text-sm font-semibold leading-5 last:border-r-0 sm:px-5 sm:py-4 sm:text-base lg:text-lg">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f9ff]'} border-t border-[#e0edff]`}>
              <th scope="row" className="border-r border-[#e0edff] px-4 py-2.5 text-sm font-semibold leading-5 text-[#173b78] sm:px-5 sm:py-3 sm:text-base">
                <span className="block">{row.service}</span>
                {row.note && <span className="mt-0.5 block font-normal text-[var(--color-text-light)]">{row.note}</span>}
              </th>
              {row.prices.map((price, priceIndex) => (
                <td key={`${row.id}-price-${priceIndex}`} className="border-r border-[#e0edff] px-4 py-2.5 text-center text-sm font-medium text-[#354969] last:border-r-0 sm:px-5 sm:py-3 sm:text-base">{price}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export const Pricing = ({ data }: PricingProps) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[var(--color-bg-alt)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 sm:gap-9 lg:gap-10">
        <PriceTable data={data.dogTable} />
        <PriceTable data={data.catTable} />

        <section className="relative overflow-hidden rounded-2xl bg-[#f0f7ff] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
          <header className="mb-5 text-center sm:mb-7">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[var(--color-primary)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] sm:text-sm">{data.addonsEyebrow}</p>
              <span className="h-px w-8 bg-[var(--color-primary)]" />
            </div>
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-primary)] sm:text-4xl">{data.addonsTitle}</h2>
          </header>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {data.addons.map((addon) => (
              <article key={addon.id} className="flex min-h-36 flex-col items-center justify-center rounded-xl bg-white px-3 py-4 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:min-h-40 sm:px-4">
                <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f2ff] text-2xl text-[var(--color-primary)] sm:h-16 sm:w-16 sm:text-3xl">{renderIcon(addon.icon)}</span>
                <h3 className="text-sm font-semibold leading-5 text-[var(--color-primary)] sm:text-base">{addon.title}</h3>
                <p className="mt-1 font-heading text-lg font-semibold text-[var(--color-primary)] sm:text-xl">{addon.price}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

import { useTranslations, useMessages } from 'next-intl';

type Season = { name: string; months: string; factors: string[]; rating: string };

export default function SeasonalSection() {
  const t = useTranslations('seasonal');
  const messages = useMessages() as any;
  const factorLabels: string[] = messages?.seasonal?.factorLabels || [];
  const seasons: Season[] = messages?.seasonal?.seasons || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full text-left text-sm min-w-[720px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <th className="p-4 font-semibold" style={{ color: 'var(--text-primary)' }} aria-hidden="true"></th>
                {seasons.map((s, si) => (
                  <th key={si} className="p-4 text-center align-top">
                    <div className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</div>
                    <div className="text-xs font-normal mt-1" style={{ color: 'var(--accent)' }}>{s.months}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {factorLabels.map((label, fi) => (
                <tr key={fi} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td className="p-4 font-medium w-40 align-top" style={{ color: 'var(--text-secondary)' }}>{label}</td>
                  {seasons.map((s, si) => (
                    <td key={si} className="p-4 align-top leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {s.factors[fi]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
                <td className="p-4 font-medium" style={{ color: 'var(--text-secondary)' }}>{t('ratingLabel')}</td>
                {seasons.map((s, si) => (
                  <td key={si} className="p-4 text-center whitespace-nowrap" style={{ color: 'var(--accent)' }}>{s.rating}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl p-5 flex gap-3 items-start" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t('tipTitle')}：</span>
            {t('tip')}
          </p>
        </div>
      </div>
    </section>
  );
}

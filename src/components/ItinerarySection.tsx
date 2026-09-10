import { useTranslations, useMessages } from 'next-intl';

type Card = { name: string; total: string; steps: string[] };

export default function ItinerarySection() {
  const t = useTranslations('itineraries');
  const messages = useMessages() as any;
  const cards: Card[] = messages?.itineraries?.cards || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, ci) => (
            <div key={ci} className="rounded-2xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{card.name}</h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'var(--accent-soft, #e2ecee)', color: 'var(--accent)' }}>
                  {card.total}
                </span>
              </div>
              <ol className="relative space-y-5">
                {card.steps.map((step, si) => (
                  <li key={si} className="flex gap-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center"
                      style={{ background: 'var(--bg-primary)', border: '1.5px solid var(--accent)', color: 'var(--accent)' }}
                    >
                      {si + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('note')}</p>
      </div>
    </section>
  );
}

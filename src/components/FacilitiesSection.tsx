import { useTranslations, useMessages } from 'next-intl';

type Group = { name: string; items: string[] };

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const onsite: string[] = messages?.facilities?.onsite || [];
  const groups: Group[] = messages?.facilities?.groups || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 园区现场服务 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl p-6 h-full" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t('onsiteTitle')}
              </h3>
              <ul className="space-y-3">
                {onsite.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 周边设施类型速览 */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {groups.map((group, gi) => (
                <div
                  key={gi}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <h4 className="font-display font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: 'var(--accent)' }} />
                    {group.name}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('notice')}</p>
      </div>
    </section>
  );
}

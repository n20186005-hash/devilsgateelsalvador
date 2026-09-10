import { useTranslations, useMessages } from 'next-intl';

type Topic = { title: string; content: string };

export default function ScienceSection() {
  const t = useTranslations('science');
  const messages = useMessages() as any;
  const topics: Topic[] = messages?.science?.topics || [];
  const responsibilities: string[] = messages?.science?.responsibilityItems || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 科普知识 */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('topicsTitle')}
            </h3>
            {topics.map((topic, ti) => (
              <details
                key={ti}
                open={ti === 0}
                className="rounded-xl overflow-hidden"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <summary
                  className="cursor-pointer px-5 py-4 font-display font-semibold flex items-center justify-between gap-3 select-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center" style={{ background: 'var(--accent)', color: '#fff' }}>
                      {ti + 1}
                    </span>
                    {topic.title}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {topic.content}
                </div>
              </details>
            ))}
          </div>

          {/* 访客责任 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                {t('responsibilityTitle')}
              </h3>
              <ul className="space-y-3">
                {responsibilities.map((item, ri) => (
                  <li key={ri} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

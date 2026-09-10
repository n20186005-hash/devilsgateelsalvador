import { useTranslations, useMessages } from 'next-intl';

type Route = {
  key: string;
  name: string;
  audience: string;
  duration: string;
  effort: string;
  pace: string;
  route: string[];
  tip: string;
};

const glyphs: Record<string, string> = {
  family: 'M9 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2.5 19a6.5 6.5 0 0 1 13 0M14.8 17a4.5 4.5 0 0 1 6.7 0',
  photo: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  accessible: 'M12 22v-5M9 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 22v-5a7 7 0 0 1 14 0v5',
};

export default function CrowdRoutesSection() {
  const t = useTranslations('crowdRoutes');
  const messages = useMessages() as any;
  const tags: string[] = messages?.crowdRoutes?.tags || [];
  const items: Route[] = messages?.crowdRoutes?.items || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((route, ri) => (
            <div
              key={route.key}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg flex-shrink-0" style={{ background: 'var(--accent-soft, #e2ecee)', color: 'var(--accent)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={glyphs[route.key] || glyphs.photo} />
                  </svg>
                </span>
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{route.name}</h3>
              </div>

              <dl className="space-y-2 text-sm mb-5">
                <div className="flex gap-2">
                  <dt className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{tags[0] || '•'}</dt>
                  <dd style={{ color: 'var(--text-secondary)' }}>{route.audience}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{tags[1] || '•'}</dt>
                  <dd className="font-medium" style={{ color: 'var(--text-secondary)' }}>{route.duration}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{tags[2] || '•'}</dt>
                  <dd className="font-medium" style={{ color: 'var(--text-secondary)' }}>{route.effort}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{tags[3] || '•'}</dt>
                  <dd style={{ color: 'var(--text-secondary)' }}>{route.pace}</dd>
                </div>
              </dl>

              <ol className="space-y-2 mb-5">
                {route.route.map((step, si) => (
                  <li key={si} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>
                      {si + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <p className="mt-auto pt-3 border-t text-xs leading-relaxed" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                💡 {route.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

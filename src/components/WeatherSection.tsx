import { getTranslations } from 'next-intl/server';

// 观景台坐标（Panchimalco 附近），经纬度见站点配置
const LAT = 13.6249153;
const LON = -89.1923423;

const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=America%2FEl_Salvador&forecast_days=7&wind_speed_unit=kmh`;

function codeKind(code: number): 'clear' | 'partly' | 'cloud' | 'fog' | 'rain' | 'storm' {
  if (code <= 1) return 'clear';
  if (code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 95) return 'storm';
  if (code === 80 || code === 81 || code === 82) return 'rain';
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67)) return 'rain';
  if (code === 71 || code === 73 || code === 75 || code === 77) return 'cloud';
  if (code === 85 || code === 86) return 'cloud';
  return 'cloud';
}

function WeatherGlyph({ code }: { code: number }) {
  const kind = codeKind(code);
  const common = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'clear') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
      </svg>
    );
  }
  if (kind === 'partly') {
    return (
      <svg {...common}>
        <path d="M17.5 17.5a6 6 0 0 0-1-11.9A7 7 0 0 0 4.2 9.2 4.5 4.5 0 0 0 6 17.5h11.5z" />
        <circle cx="18" cy="7" r="2.6" />
      </svg>
    );
  }
  if (kind === 'fog') {
    return (
      <svg {...common}>
        <path d="M17.5 12a5 5 0 0 0-5-5 5 5 0 0 0-4.9 4A3.8 3.8 0 0 0 7 18h10.5a3.5 3.5 0 0 0 0-7h-.5z" />
        <path d="M5 20h14M3 22h18" opacity="0.7" />
      </svg>
    );
  }
  if (kind === 'storm') {
    return (
      <svg {...common}>
        <path d="M17.5 12a5 5 0 0 0-5-5 5 5 0 0 0-4.9 4A3.8 3.8 0 0 0 7 18h10.5a3.5 3.5 0 0 0 0-7z" />
        <polyline points="11.5 15 10 19 12.5 18.5 11 22" />
      </svg>
    );
  }
  // cloud / rain
  return (
    <svg {...common}>
      <path d="M17.5 12a5 5 0 0 0-5-5 5 5 0 0 0-4.9 4A3.8 3.8 0 0 0 7 18h10.5a3.5 3.5 0 0 0 0-7z" />
      {kind === 'rain' && <path d="M8.5 19.5v1.6M12 20v1.6M15.5 19.5v1.6" opacity="0.8" />}
    </svg>
  );
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const codes = t.raw('code') as Record<string, string>;
  const dow = t.raw('dow') as string[];

  let data: any = null;
  let failed = false;
  try {
    const res = await fetch(API_URL, { next: { revalidate: 1800 } });
    if (res.ok) data = await res.json();
    else failed = true;
  } catch {
    failed = true;
  }

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {failed || !data?.current ? (
          <div
            className="rounded-xl p-8 text-center text-sm"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {t('unavailable')}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{t('location')}</span>
              <span>{t('updated')}: {String(data.current.time || '').slice(11, 16)}</span>
            </div>

            {/* 当前天气 */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--accent)' }}>
                  <WeatherGlyph code={data.current.weather_code} />
                </span>
                <div>
                  <div className="font-display text-5xl font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(data.current.temperature_2m)}°
                  </div>
                  <div className="mt-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {codes[String(data.current.weather_code)] || '—'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm w-full sm:w-auto sm:ml-auto">
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{Math.round(data.current.apparent_temperature)}°C</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>{t('humidity')}</div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{data.current.relative_humidity_2m}%</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>{t('wind')}</div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{Math.round(data.current.wind_speed_10m)} {t('windUnit')}</div>
                </div>
              </div>
            </div>

            {/* 未来 7 日 */}
            <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('weekly')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {data.daily?.time?.slice(0, 7).map((date: string, i: number) => {
                const wd = dow[new Date(`${date}T12:00:00`).getDay()] ?? '';
                const code = data.daily.weather_code[i];
                return (
                  <div
                    key={date}
                    className="rounded-xl p-4 text-center"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <div className="text-sm font-medium mb-2" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                      {i === 0 ? t('today') : wd}
                    </div>
                    <div className="flex justify-center mb-2" style={{ color: 'var(--text-secondary)' }}>
                      <WeatherGlyph code={code} />
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(data.daily.temperature_2m_max[i])}° / {Math.round(data.daily.temperature_2m_min[i])}°
                    </div>
                    <div className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t('precip')}: {data.daily.precipitation_probability_max?.[i] ?? '-'}%
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

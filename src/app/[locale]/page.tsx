import { setRequestLocale } from 'next-intl/server';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import NearbySection from '@/components/NearbySection';
import FacilitiesSection from '@/components/FacilitiesSection';
import HistoryTimeline from '@/components/HistoryTimeline';
import SeasonalSection from '@/components/SeasonalSection';
import CrowdRoutesSection from '@/components/CrowdRoutesSection';
import ItinerarySection from '@/components/ItinerarySection';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import WeatherSection from '@/components/WeatherSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import ScienceSection from '@/components/ScienceSection';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

// 页面级增量再生成：天气/信息以约 15 分钟为周期在服务端刷新
export const revalidate = 900;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const faqItems: Array<{ q: string; a: string }> = messages?.faq?.items || [];
  const selfUrl = `${SITE.url}/${locale}`;

  // 1. 单景点结构化数据（TouristAttraction，含 @id 与 image，锚定知识图谱节点）
  const attractionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE.url}/#attraction`,
    name: SITE.displayName,
    alternateName: [
      SITE.attractionFullName,
      SITE.attractionShortName,
      `${SITE.attractionFullName} ${SITE.cityName}`,
      `${SITE.attractionShortName} ${SITE.cityName}`,
    ],
    description:
      messages?.meta?.description ||
      `Comprehensive visitor guide to ${SITE.displayName} in ${SITE.cityName}, ${SITE.countryName}.`,
    url: selfUrl,
    image: [SITE.heroImageAbs],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.displayName,
      addressLocality: SITE.cityName,
      addressRegion: SITE.stateProvince,
      addressCountry: SITE.countryCode2Letter,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    sameAs: [SITE.mapsShareUrl, SITE.govtTourismUrl],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
  };

  // 4. FAQPage 结构化数据（与页面可见 FAQ 区块内容保持一致）
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <NearbySection />
        <FacilitiesSection />
        <HistoryTimeline />
        <SeasonalSection />
        <CrowdRoutesSection />
        <ItinerarySection />
        <RouteSection />
        <WeatherSection />
        <Gallery />
        <Reviews />
        <ScienceSection />
        <FaqSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}

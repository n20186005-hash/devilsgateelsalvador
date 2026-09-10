/**
 * 单景点 SEO 实体绑定配置变量表
 * 集中管理本站在 Schema.org / TDK / OG / 正文语义绑定中引用的景点实体数据。
 */
export const SITE = {
  /** 网站域名 */
  domain: 'devilsgateelsalvador.com',
  /** 站点根地址 */
  url: 'https://devilsgateelsalvador.com',

  /** 景点官方全称（Google Maps 主名称） */
  attractionFullName: "Devil's Gate",
  /** 景点常用俗称 / 官方西语名称 */
  attractionShortName: 'Puerta del Diablo',
  /** 页面展示用完整名称 */
  displayName: "Devil's Gate (Puerta del Diablo)",

  /** 所在城市/城镇 */
  cityName: 'Panchimalco',
  /** 所在省/州 */
  stateProvince: 'San Salvador Department',
  /** 所在国家 */
  countryName: 'El Salvador',
  /** 两位国家代码 */
  countryCode2Letter: 'SV',

  /** 纬度 */
  latitude: 13.6249153,
  /** 经度 */
  longitude: -89.1923423,

  /** Google Maps 分享短链接 */
  mapsShareUrl: 'https://maps.app.goo.gl/piTumZua8o8Wvam17',
  /** Google Maps 嵌入 iframe 的 src */
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6896.769424132211!2d-89.1923423!3d13.6249153!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6333dd4dd8b4a9%3A0x64ab35fb0d7621fa!2sDevil\'s%20Gate!5e1!3m2!1szh-CN!2s!4v1788847814394!5m2!1szh-CN!2s',

  /** 周边核心地标 1 */
  nearbyLandmark1: 'San Vicente Volcano',
  /** 周边核心地标 2 */
  nearbyLandmark2: 'Lake Ilopango',

  /** 当地政府 / 官方旅游局链接 */
  govtTourismUrl: 'https://elsalvador.travel/esp/',

  /** 主视觉图（Hero / OG / JSON-LD image） */
  heroImage: '/gallery/devils-gate-view-1.jpg',
  heroImageAbs: 'https://devilsgateelsalvador.com/gallery/devils-gate-view-1.jpg',

  /** GA4 Measurement ID */
  ga4Id: 'G-HXM22WWPKP',
} as const;

export const SITE_LOCALES = ['zh', 'en', 'es'] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

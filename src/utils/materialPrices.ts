export type MaterialPriceConfidence =
  | 'مرتفع'
  | 'متوسط'
  | 'منخفض';

export type MaterialPrice = {
  id: string;
  category: string;
  name: string;
  unit: string;
  price?: number;
  priceFrom?: number;
  priceTo?: number;
  currency: 'YER' | 'SAR' | 'USD';
  city: string;
  sourceName: string;
  sourceUrl: string;
  updatedAt: string;
  confidence: MaterialPriceConfidence;
};

const CACHE_KEY =
  'dftr-material-prices-cache';

const REMOTE_URL =
  'https://raw.githubusercontent.com/mlutf7-source/dftr-material-prices/main/prices.json';

const fallbackPrices: MaterialPrice[] = [
  {
    id: 'steel-sample',
    category: 'حديد',
    name: 'حديد تسليح',
    unit: 'طن',
    priceFrom: 0,
    priceTo: 0,
    currency: 'YER',
    city: 'اليمن',
    sourceName: 'بانتظار ربط المصدر',
    sourceUrl: '#',
    updatedAt: '',
    confidence: 'منخفض',
  },
  {
    id: 'cement-sample',
    category: 'أسمنت',
    name: 'أسمنت',
    unit: 'كيس',
    priceFrom: 0,
    priceTo: 0,
    currency: 'YER',
    city: 'اليمن',
    sourceName: 'بانتظار ربط المصدر',
    sourceUrl: '#',
    updatedAt: '',
    confidence: 'منخفض',
  },
];

const readCache = () => {
  try {
    const saved =
      localStorage.getItem(CACHE_KEY);

    if (!saved) return null;

    return JSON.parse(saved) as MaterialPrice[];
  } catch {
    return null;
  }
};

const writeCache = (
  prices: MaterialPrice[]
) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify(prices)
  );
};

export const loadMaterialPrices =
  async (): Promise<{
    prices: MaterialPrice[];
    fromCache: boolean;
    error?: string;
  }> => {
    try {
      const res =
        await fetch(REMOTE_URL, {
          cache: 'no-store',
        });

      if (!res.ok) {
        throw new Error(
          'تعذر تحميل الأسعار'
        );
      }

      const data =
        (await res.json()) as MaterialPrice[];

      if (!Array.isArray(data)) {
        throw new Error(
          'ملف الأسعار غير صالح'
        );
      }

      writeCache(data);

      return {
        prices: data,
        fromCache: false,
      };
    } catch (error) {
      const cached = readCache();

      if (cached?.length) {
        return {
          prices: cached,
          fromCache: true,
          error: 'تم عرض آخر نسخة محفوظة',
        };
      }

      return {
        prices: fallbackPrices,
        fromCache: true,
        error:
          error instanceof Error
            ? error.message
            : 'تعذر تحميل الأسعار',
      };
    }
  };

export const formatMaterialPrice = (
  price: MaterialPrice
) => {
  const value =
    price.price ||
    price.priceTo ||
    price.priceFrom ||
    0;

  if (!value) {
    return 'غير متوفر';
  }

  return `${value.toLocaleString(
    'en-US'
  )} ${currencyName(price.currency)}`;
};

export const formatPriceRange = (
  price: MaterialPrice
) => {
  if (price.price) {
    return `${price.price.toLocaleString(
      'en-US'
    )} ${currencyName(price.currency)}`;
  }

  if (
    price.priceFrom &&
    price.priceTo &&
    price.priceFrom !== price.priceTo
  ) {
    return `من ${price.priceFrom.toLocaleString(
      'en-US'
    )} إلى ${price.priceTo.toLocaleString(
      'en-US'
    )} ${currencyName(price.currency)}`;
  }

  const value =
    price.priceTo ||
    price.priceFrom ||
    0;

  if (!value) return 'غير متوفر';

  return `${value.toLocaleString(
    'en-US'
  )} ${currencyName(price.currency)}`;
};

export const currencyName = (
  currency: MaterialPrice['currency']
) => {
  if (currency === 'SAR') {
    return 'ريال سعودي';
  }

  if (currency === 'USD') {
    return 'دولار أمريكي';
  }

  return 'ريال يمني';
};

const confidenceScore = (
  confidence: MaterialPriceConfidence
) => {
  if (confidence === 'مرتفع') return 3;
  if (confidence === 'متوسط') return 2;
  return 1;
};

const dateScore = (date: string) => {
  const time =
    new Date(date).getTime();

  if (!Number.isFinite(time)) {
    return 0;
  }

  return time / 1000000000000;
};

export const smartSortPrices = (
  prices: MaterialPrice[],
  city = ''
) => {
  return [...prices].sort((a, b) => {
    const cityA =
      city && a.city.includes(city)
        ? 5
        : 0;

    const cityB =
      city && b.city.includes(city)
        ? 5
        : 0;

    const scoreA =
      cityA +
      confidenceScore(a.confidence) +
      dateScore(a.updatedAt);

    const scoreB =
      cityB +
      confidenceScore(b.confidence) +
      dateScore(b.updatedAt);

    return scoreB - scoreA;
  });
};

export const getBannerHighlights = (
  prices: MaterialPrice[]
) => {
  const findByCategory = (
    category: string
  ) =>
    smartSortPrices(
      prices.filter(
        p => p.category === category
      )
    )[0];

  return [
    findByCategory('حديد'),
    findByCategory('أسمنت'),
    findByCategory('بلك'),
  ].filter(Boolean) as MaterialPrice[];
};

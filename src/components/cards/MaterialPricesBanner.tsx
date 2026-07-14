import {
  useEffect,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import type {
  Project,
} from '../../models/types';

import {
  formatMaterialPrice,
  getBannerHighlights,
  loadMaterialPrices,
  type MaterialPrice,
} from '../../utils/materialPrices';

type Props = {
  project: Project;
};

export default function MaterialPricesBanner({
  project,
}: Props) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const isPricesPage =
    location.pathname.includes(
      '/material-prices'
    );

  const [prices, setPrices] =
    useState<MaterialPrice[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const load = async () => {
    setLoading(true);
    setError('');

    const result =
      await loadMaterialPrices();

    setPrices(result.prices);
    setError(result.error || '');
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (isPricesPage) {
    return null;
  }

  const highlights =
    getBannerHighlights(prices);

  const latest =
    prices
      .map(p => p.updatedAt)
      .filter(Boolean)
      .sort()
      .at(-1);

  return (
    <div
      className="card no-print"
      style={{
        marginBottom: 12,
        padding: 14,
        borderRadius: 18,
        background:
          'linear-gradient(135deg, #0f3f8c, #155ed1, #6d28d9)',
        color: '#fff',
        boxShadow:
          '0 12px 30px rgba(15, 63, 140, .25)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '.95rem',
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            🏷️ أسعار مواد البناء اليوم
          </div>

          <div
            style={{
              fontSize: '.72rem',
              opacity: .9,
            }}
          >
            {latest
              ? `آخر تحديث: ${latest}`
              : 'تحديث الأسعار من الإنترنت'}
          </div>
        </div>

        <button
          className="btn gray"
          style={{
            background: '#fff',
            color: '#0f3f8c',
            padding: '8px 10px',
            borderRadius: 14,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}
          onClick={() =>
            navigate(
              `/project/${project.id}/material-prices`
            )
          }
        >
          عرض الأسعار
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(3, 1fr)',
          gap: 8,
          marginTop: 12,
        }}
      >
        {highlights.length ? (
          highlights.map(item => (
            <div
              key={item.id}
              style={{
                background:
                  'rgba(255,255,255,.16)',
                border:
                  '1px solid rgba(255,255,255,.24)',
                borderRadius: 14,
                padding: 9,
              }}
            >
              <div
                style={{
                  fontSize: '.72rem',
                  opacity: .9,
                }}
              >
                {item.category}
              </div>

              <strong
                style={{
                  display: 'block',
                  fontSize: '.78rem',
                  marginTop: 3,
                }}
              >
                {formatMaterialPrice(item)}
              </strong>

              <small
                style={{
                  display: 'block',
                  opacity: .8,
                  marginTop: 3,
                }}
              >
                / {item.unit}
              </small>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              fontSize: '.78rem',
              opacity: .9,
            }}
          >
            {loading
              ? 'جاري تحميل الأسعار...'
              : 'لم يتم تحميل الأسعار بعد'}
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            marginTop: 10,
            fontSize: '.72rem',
            opacity: .85,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
                  }

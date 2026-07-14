import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useOutletContext,
} from 'react-router-dom';

import type {
  Project,
} from '../../models/types';

import {
  formatPriceRange,
  loadMaterialPrices,
  smartSortPrices,
  type MaterialPrice,
} from '../../utils/materialPrices';

type Ctx = {
  project: Project;
};

export default function MaterialPrices() {
  const {
    project,
  } = useOutletContext<Ctx>();

  const [prices, setPrices] =
    useState<MaterialPrice[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [search, setSearch] =
    useState('');

  const [city, setCity] =
    useState('الكل');

  const [category, setCategory] =
    useState('الكل');

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

  const cities = useMemo(() => {
    const list =
      Array.from(
        new Set(
          prices
            .map(p => p.city)
            .filter(Boolean)
        )
      );

    return ['الكل', ...list];
  }, [prices]);

  const categories = useMemo(() => {
    const list =
      Array.from(
        new Set(
          prices
            .map(p => p.category)
            .filter(Boolean)
        )
      );

    return ['الكل', ...list];
  }, [prices]);

  const filtered = useMemo(() => {
    const s =
      search.trim().toLowerCase();

    const list =
      prices.filter(item => {
        const matchSearch =
          !s ||
          [
            item.name,
            item.category,
            item.city,
            item.sourceName,
          ]
            .join(' ')
            .toLowerCase()
            .includes(s);

        const matchCity =
          city === 'الكل' ||
          item.city === city;

        const matchCategory =
          category === 'الكل' ||
          item.category === category;

        return (
          matchSearch &&
          matchCity &&
          matchCategory
        );
      });

    return smartSortPrices(
      list,
      project.location
    );
  }, [
    prices,
    search,
    city,
    category,
    project.location,
  ]);

  const latest =
    prices
      .map(p => p.updatedAt)
      .filter(Boolean)
      .sort()
      .at(-1);

  return (
    <div>
      <div className="section-title-box">
        <h2>
          🏷️ أسعار مواد البناء اليوم
        </h2>
      </div>

      <div className="card">
        <div className="row">
          <button
            className="btn primary"
            onClick={load}
            disabled={loading}
          >
            {loading
              ? 'جاري التحديث...'
              : 'تحديث الأسعار'}
          </button>
        </div>

        <p
          style={{
            marginTop: 10,
            color: '#6b7280',
            fontSize: '.82rem',
            lineHeight: 1.8,
          }}
        >
          يتم ترتيب الأسعار تلقائيًا حسب
          المدينة، حداثة التحديث، ودرجة ثقة
          المصدر.
        </p>

        <p
          style={{
            color: '#003366',
            fontWeight: 800,
          }}
        >
          آخر تحديث:{' '}
          {latest || 'غير متوفر'}
        </p>

        {error && (
          <p
            style={{
              color: '#b45309',
              fontWeight: 700,
            }}
          >
            {error}
          </p>
        )}
      </div>

      <div className="card">
        <label className="field">
          <span>بحث عن مادة</span>

          <input
            value={search}
            placeholder="حديد، أسمنت، بلك..."
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </label>

        <div className="form-row-2">
          <label className="field">
            <span>المحافظة</span>

            <select
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            >
              {cities.map(x => (
                <option
                  key={x}
                  value={x}
                >
                  {x}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>التصنيف</span>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map(x => (
                <option
                  key={x}
                  value={x}
                >
                  {x}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {!filtered.length && (
        <div className="empty-state">
          لا توجد أسعار مطابقة
        </div>
      )}

      <div className="grid">
        {filtered.map(item => (
          <div
            className="card"
            key={item.id}
          >
            <h3>{item.name}</h3>

            <p>
              <b>التصنيف:</b>{' '}
              {item.category}
            </p>

            <p>
              <b>الوحدة:</b>{' '}
              {item.unit}
            </p>

            <p>
              <b>السعر:</b>{' '}
              <strong>
                {formatPriceRange(item)}
              </strong>
            </p>

            <p>
              <b>المدينة:</b>{' '}
              {item.city}
            </p>

            <p>
              <b>المصدر:</b>{' '}
              {item.sourceName}
            </p>

            <p>
              <b>الثقة:</b>{' '}
              {item.confidence}
            </p>

            <p>
              <b>آخر تحديث:</b>{' '}
              {item.updatedAt || '-'}
            </p>

            {item.sourceUrl !== '#' && (
              <a
                className="btn gray"
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                فتح المصدر
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
      }

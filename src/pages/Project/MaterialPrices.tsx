import {
  useEffect,
  useState,
} from 'react';

const PRICES_HTML_URL =
  'https://raw.githubusercontent.com/mlutf7-source/dftr-material-prices/main/index.html';

export default function MaterialPrices() {
  const [html, setHtml] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const loadPricesPage = async () => {
    setLoading(true);
    setError('');

    try {
      const res =
        await fetch(PRICES_HTML_URL, {
          cache: 'no-store',
        });

      if (!res.ok) {
        throw new Error(
          'تعذر تحميل صفحة الأسعار'
        );
      }

      const text =
        await res.text();

      if (
        !text.includes(
          'أسعار مواد البناء'
        )
      ) {
        throw new Error(
          'محتوى صفحة الأسعار غير صالح'
        );
      }

      setHtml(text);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تحميل صفحة الأسعار'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricesPage();
  }, []);

  return (
    <div>
      <div className="section-title-box">
        <h2>
          🏷️ أسعار مواد البناء اليوم
        </h2>
      </div>

      {loading && (
        <div className="card">
          جاري تحميل أسعار مواد البناء...
        </div>
      )}

      {error && (
        <div className="card">
          <p
            style={{
              color: '#b91c1c',
              fontWeight: 800,
              lineHeight: 1.8,
            }}
          >
            {error}
          </p>

          <button
            className="btn primary"
            onClick={loadPricesPage}
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {!loading && !error && html && (
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
            height: '75vh',
          }}
        >
          <iframe
            title="أسعار مواد البناء"
            srcDoc={html}
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              display: 'block',
              background: '#fff',
            }}
          />
        </div>
      )}
    </div>
  );
}

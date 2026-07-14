export default function MaterialPrices() {
  const pageUrl =
    'https://mlutf7-source.github.io/dftr-material-prices/';

  return (
    <div>
      <div className="section-title-box">
        <h2>
          🏷️ أسعار مواد البناء اليوم
        </h2>
      </div>

      <div
        className="card"
        style={{
          padding: 0,
          overflow: 'hidden',
          height: '75vh',
        }}
      >
        <iframe
          src={pageUrl}
          title="أسعار مواد البناء"
          style={{
            width: '100%',
            height: '100%',
            border: '0',
            display: 'block',
            background: '#fff',
          }}
        />
      </div>

      <a
        className="btn gray"
        href={pageUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 10,
          display: 'block',
          textAlign: 'center',
        }}
      >
        فتح صفحة الأسعار كاملة
      </a>
    </div>
  );
}

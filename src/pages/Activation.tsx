import { useEffect, useState } from 'react';

import {
  getLicenseState,
  saveActivatedLicense,
  type LicenseState,
} from '../utils/license';

const DEVELOPER_WHATSAPP =
  '967778880031';

const cleanCode = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();

const formatCode = (value: string) =>
  cleanCode(value)
    .slice(0, 12)
    .match(/.{1,4}/g)
    ?.join('-') || '';

export default function Activation() {
  const [license, setLicense] =
    useState<LicenseState | null>(null);

  const [activationCode, setActivationCode] =
    useState('');

  const [customerName, setCustomerName] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [activating, setActivating] =
    useState(false);

  useEffect(() => {
    getLicenseState().then((state) => {
      setLicense(state);
      setLoading(false);
    });
  }, []);

  const copyDeviceCode = async () => {
    if (!license?.deviceCode) return;

    await navigator.clipboard.writeText(
      license.deviceCode
    );

    alert('تم نسخ الرقم التسلسلي');
  };

  const requestActivation = () => {
    if (!license?.deviceCode) return;

    const text =
      `طلب تفعيل تطبيق دفتر المقاول\n\n` +
      `الرقم التسلسلي للجهاز:\n` +
      `${license.deviceCode}\n\n` +
      `الاسم:\n` +
      `${customerName || '-'}`;

    const url =
      `https://wa.me/${DEVELOPER_WHATSAPP}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
  };

  const refreshLicense = async () => {
    const state =
      await getLicenseState();

    setLicense(state);

    return state;
  };

  const activate = async () => {
    if (!license?.deviceCode) return;

    const enteredCode =
      formatCode(activationCode);

    if (!enteredCode) {
      alert('أدخل كود التفعيل');
      return;
    }

    setActivating(true);

    const state =
      await saveActivatedLicense(
        enteredCode,
        customerName
      );

    setLicense(state);
    setActivating(false);

    if (state.activated) {
      alert(
        state.message ||
          'تم تفعيل التطبيق بنجاح'
      );

      window.location.href = '/';
      return;
    }

    alert(
      state.message ||
        'كود التفعيل غير صحيح'
    );
  };

  if (loading) {
    return (
      <div className="activation-page">
        <div className="activation-card">
          جاري تحميل بيانات التفعيل...
        </div>
      </div>
    );
  }

  return (
    <div className="activation-page">
      <div className="activation-card">
        <h1>🔐 تفعيل التطبيق</h1>

        {license?.activated ? (
          <>
            <div className="activation-success">
              ✅ التطبيق مفعل
            </div>

            <p>
              <b>الرقم التسلسلي:</b>
              <br />
              {license.deviceCode}
            </p>

            {license.customerName && (
              <p>
                <b>اسم العميل:</b>
                <br />
                {license.customerName}
              </p>
            )}

            <button
              className="btn primary"
              onClick={() =>
                (window.location.href = '/')
              }
            >
              دخول التطبيق
            </button>
          </>
        ) : (
          <>
            <p className="activation-note">
              هذا الجهاز غير مفعل. إذا كانت
              الفترة التجريبية منتهية، يلزم
              إدخال كود التفعيل الخاص بهذا
              الرقم التسلسلي.
            </p>

            {license && !license.trialExpired && (
              <div className="activation-success">
                الفترة التجريبية متبقي منها{' '}
                {license.trialDaysLeft} يوم
              </div>
            )}

            {license?.trialExpired && (
              <div className="activation-error">
                انتهت الفترة التجريبية لهذا
                الجهاز
              </div>
            )}

            {license?.message && (
              <p className="activation-small">
                {license.message}
              </p>
            )}

            <label className="field">
              <span>الرقم التسلسلي للجهاز</span>

              <textarea
                value={license?.deviceCode || ''}
                readOnly
                rows={3}
              />
            </label>

            <div className="row">
              <button
                className="btn gray"
                onClick={copyDeviceCode}
              >
                نسخ الرقم
              </button>

              <button
                className="btn primary"
                onClick={requestActivation}
              >
                إرسال طلب التفعيل
              </button>
            </div>

            <label className="field">
              <span>اسم العميل</span>

              <input
                value={customerName}
                onChange={(e) =>
                  setCustomerName(
                    e.target.value
                  )
                }
                placeholder="اختياري"
              />
            </label>

            <label className="field">
              <span>كود التفعيل</span>

              <input
                value={activationCode}
                onChange={(e) =>
                  setActivationCode(
                    formatCode(e.target.value)
                  )
                }
                placeholder="DFTR-XXXX-XXXX"
                dir="ltr"
              />
            </label>

            <button
              className="btn primary full"
              onClick={activate}
              disabled={activating}
            >
              {activating
                ? 'جاري التفعيل...'
                : 'تفعيل التطبيق'}
            </button>

            <button
              className="btn gray full"
              onClick={refreshLicense}
              style={{ marginTop: 8 }}
            >
              تحديث حالة التفعيل
            </button>

            <p className="activation-small">
              كود التفعيل يتم أخذه من سجل
              Google Sheet، وهو مرتبط بهذا
              الرقم التسلسلي فقط.
            </p>
          </>
        )}
      </div>
    </div>
  );
                }

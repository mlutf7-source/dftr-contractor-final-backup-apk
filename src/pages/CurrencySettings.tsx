import { useState } from 'react';

import AppCard from '../components/cards/AppCard';
import FormattedNumberInput from '../components/forms/FormattedNumberInput';

import { DEFAULT_RATES } from '../utils/constants';

export default function CurrencySettings() {
  const [sar, setSar] = useState(
      Number(
            localStorage.getItem('rate-sar') ||
                  DEFAULT_RATES.SAR
                      )
                        );

                          const [usd, setUsd] = useState(
                              Number(
                                    localStorage.getItem('rate-usd') ||
                                          DEFAULT_RATES.USD
                                              )
                                                );

                                                  const save = () => {
                                                      localStorage.setItem(
                                                            'rate-sar',
                                                                  String(sar)
                                                                      );

                                                                          localStorage.setItem(
                                                                                'rate-usd',
                                                                                      String(usd)
                                                                                          );

                                                                                              alert('تم حفظ أسعار الصرف');
                                                                                                };

                                                                                                  return (
                                                                                                      <div>
                                                                                                            <div className="section-title-box">
                                                                                                                    <h2>💱 العملات</h2>
                                                                                                                          </div>

                                                                                                                                <AppCard title="أسعار الصرف الافتراضية">
                                                                                                                                        <FormattedNumberInput
                                                                                                                                                  label="الريال السعودي"
                                                                                                                                                            value={sar}
                                                                                                                                                                      onChange={setSar}
                                                                                                                                                                              />

                                                                                                                                                                                      <FormattedNumberInput
                                                                                                                                                                                                label="الدولار الأمريكي"
                                                                                                                                                                                                          value={usd}
                                                                                                                                                                                                                    onChange={setUsd}
                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                    <button
                                                                                                                                                                                                                                              className="btn primary"
                                                                                                                                                                                                                                                        onClick={save}
                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                          حفظ
                                                                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                                                                        </AppCard>
                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                              }
import type {
    CurrencyCode,
      ExchangeRates,
      } from '../../models/types';

      import { currencies } from '../../utils/currency';
      import FormattedNumberInput from '../forms/FormattedNumberInput';

      type Props = {
        currency: CurrencyCode;
          rates?: ExchangeRates;
            rate: number;
              onCurrency: (c: CurrencyCode) => void;
                onRate: (r: number) => void;
                };

                export default function CurrencySelector({
                  currency,
                    rates,
                      rate,
                        onCurrency,
                          onRate,
                          }: Props) {
                            const changeCurrency = (value: CurrencyCode) => {
                                onCurrency(value);

                                    if (value === 'SAR') {
                                          onRate(rates?.SAR || rate || 1);
                                                return;
                                                    }

                                                        if (value === 'USD') {
                                                              onRate(rates?.USD || rate || 1);
                                                                    return;
                                                                        }

                                                                            onRate(1);
                                                                              };

                                                                                return (
                                                                                    <>
                                                                                          <label className="field">
                                                                                                  <span>العملة</span>

                                                                                                          <select
                                                                                                                    value={currency}
                                                                                                                              onChange={(e) =>
                                                                                                                                          changeCurrency(
                                                                                                                                                        e.target.value as CurrencyCode
                                                                                                                                                                    )
                                                                                                                                                                              }
                                                                                                                                                                                      >
                                                                                                                                                                                                {currencies.map((c) => (
                                                                                                                                                                                                            <option
                                                                                                                                                                                                                          key={c.code}
                                                                                                                                                                                                                                        value={c.code}
                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                  {c.name}
                                                                                                                                                                                                                                                                              </option>
                                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                                </select>
                                                                                                                                                                                                                                                                                                      </label>

                                                                                                                                                                                                                                                                                                            {currency !== 'YER' && (
                                                                                                                                                                                                                                                                                                                    <FormattedNumberInput
                                                                                                                                                                                                                                                                                                                              label={`1 ${currency} = ريال يمني`}
                                                                                                                                                                                                                                                                                                                                        value={rate}
                                                                                                                                                                                                                                                                                                                                                  onChange={onRate}
                                                                                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                                                    </>
                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                      }

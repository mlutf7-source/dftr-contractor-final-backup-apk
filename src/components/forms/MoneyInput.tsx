import type { CurrencyCode } from '../../models/types';
import { currencies } from '../../utils/currency';
import FormattedNumberInput from './FormattedNumberInput';

type Props = {
  label: string;
    amount: number;
      currency: CurrencyCode;
        onAmount: (v: number) => void;
          onCurrency: (v: CurrencyCode) => void;
          };

          export default function MoneyInput({
            label,
              amount,
                currency,
                  onAmount,
                    onCurrency,
                    }: Props) {
                      return (
                          <div className="money-row">

                                <FormattedNumberInput
                                        label={label}
                                                value={amount}
                                                        onChange={onAmount}
                                                              />

                                                                    <label className="field">

                                                                            <span>العملة</span>

                                                                                    <select
                                                                                              value={currency}
                                                                                                        onChange={(e) =>
                                                                                                                    onCurrency(
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

                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                      }
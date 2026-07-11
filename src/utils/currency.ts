import type {
    CurrencyCode,
      ExchangeRates,
      } from '../models/types';

      import {
        CURRENCIES,
          DEFAULT_RATES,
          } from './constants';

          export const currencies = CURRENCIES;

          export const defaultRates = DEFAULT_RATES;

          export const currencyName = (
            currency: CurrencyCode | string
            ) => {
              if (currency === 'YER') return 'ريال يمني';
                if (currency === 'SAR') return 'ريال سعودي';
                  if (currency === 'USD') return 'دولار أمريكي';
                    return currency;
                    };

                    export const rateOf = (
                      currency: CurrencyCode,
                        rates: ExchangeRates
                        ) => {
                          if (currency === 'SAR') return rates.SAR;
                            if (currency === 'USD') return rates.USD;
                              return 1;
                              };

                              export const toYER = (
                                amount: number,
                                  currency: CurrencyCode,
                                    rates: ExchangeRates
                                    ) =>
                                      amount * rateOf(currency, rates);

                                      export const fromYER = (
                                        amountYER: number,
                                          currency: CurrencyCode,
                                            rates: ExchangeRates
                                            ) =>
                                              amountYER / rateOf(currency, rates);

                                              export const convert = (
                                                amount: number,
                                                  from: CurrencyCode,
                                                    to: CurrencyCode,
                                                      rates: ExchangeRates
                                                      ) => {
                                                        const yer = toYER(amount, from, rates);
                                                          return fromYER(yer, to, rates);
                                                          };

                                                          export const money = (
                                                            value: number,
                                                              currency: CurrencyCode | string
                                                              ) =>
                                                                `${Number(value || 0).toLocaleString('en-US', {
                                                                    maximumFractionDigits: 2,
                                                                      })} ${currencyName(currency)}`;

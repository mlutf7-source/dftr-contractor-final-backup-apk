import type { CurrencyCode } from '../../models/types';
import { money } from '../../utils/currency';

type Props = {
  due: number;
    paid: number;
      balance: number;
        currency: CurrencyCode;

          dueTitle?: string;
            paidTitle?: string;
              balanceTitle?: string;

                balanceStatus?: string;
                  balanceColor?: 'blue' | 'red';
                  };

                  export default function SummaryCards({
                    due,
                      paid,
                        balance,
                          currency,

                            dueTitle = 'إجمالي المستحقات',
                              paidTitle = 'إجمالي المدفوعات',
                                balanceTitle = 'الرصيد المتبقي',

                                  balanceStatus = '',
                                    balanceColor = 'blue',
                                    }: Props) {
                                      const colorClass =
                                          balanceColor === 'red'
                                                ? 'red'
                                                      : 'blue';

                                                        return (
                                                            <div className="summary-grid">

                                                                  <div className="summary-card">

                                                                          <small>
                                                                                    {dueTitle}
                                                                                            </small>

                                                                                                    <strong className="green">
                                                                                                              {money(due, currency)}
                                                                                                                      </strong>

                                                                                                                            </div>

                                                                                                                                  <div className="summary-card">

                                                                                                                                          <small>
                                                                                                                                                    {paidTitle}
                                                                                                                                                            </small>

                                                                                                                                                                    <strong className="orange">
                                                                                                                                                                              {money(paid, currency)}
                                                                                                                                                                                      </strong>

                                                                                                                                                                                            </div>

                                                                                                                                                                                                  <div className="summary-card">

                                                                                                                                                                                                          <small>
                                                                                                                                                                                                                    {balanceTitle}
                                                                                                                                                                                                                            </small>

                                                                                                                                                                                                                                    <strong className={colorClass}>
                                                                                                                                                                                                                                              {money(Math.abs(balance), currency)}
                                                                                                                                                                                                                                                      </strong>

                                                                                                                                                                                                                                                              {balanceStatus && (
                                                                                                                                                                                                                                                                        <div
                                                                                                                                                                                                                                                                                    className={colorClass}
                                                                                                                                                                                                                                                                                                style={{
                                                                                                                                                                                                                                                                                                              marginTop: 6,
                                                                                                                                                                                                                                                                                                                            fontWeight: 800,
                                                                                                                                                                                                                                                                                                                                          fontSize: 13,
                                                                                                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                                            {balanceStatus}
                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                              )}

                                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                          }
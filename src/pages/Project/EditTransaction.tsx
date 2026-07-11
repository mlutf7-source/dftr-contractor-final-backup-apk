import { useState } from 'react';
import type { CurrencyCode, Transaction } from '../../models/types';
import MoneyInput from '../../components/forms/MoneyInput';

type Props = {
  transaction: Transaction;
    onSave: (t: Transaction) => void;
      onCancel: () => void;
      };

      export default function EditTransaction({
        transaction,
          onSave,
            onCancel,
            }: Props) {
              const [tx, setTx] = useState(transaction);

                return (
                    <div className="card">
                          <h3>تعديل العملية</h3>

                                <label className="field">
                                        <span>البيان</span>
                                                <input
                                                          value={tx.title}
                                                                    onChange={(e) => setTx({ ...tx, title: e.target.value })}
                                                                            />
                                                                                  </label>

                                                                                        <MoneyInput
                                                                                                label="المبلغ"
                                                                                                        amount={tx.originalAmount}
                                                                                                                currency={tx.currency as CurrencyCode}
                                                                                                                        onAmount={(v) => setTx({ ...tx, originalAmount: v })}
                                                                                                                                onCurrency={(v) => setTx({ ...tx, currency: v })}
                                                                                                                                      />

                                                                                                                                            <label className="field">
                                                                                                                                                    <span>التاريخ</span>
                                                                                                                                                            <input
                                                                                                                                                                      type="date"
                                                                                                                                                                                value={tx.date}
                                                                                                                                                                                          onChange={(e) => setTx({ ...tx, date: e.target.value })}
                                                                                                                                                                                                  />
                                                                                                                                                                                                        </label>

                                                                                                                                                                                                              <label className="field">
                                                                                                                                                                                                                      <span>ملاحظات</span>
                                                                                                                                                                                                                              <textarea
                                                                                                                                                                                                                                        value={tx.notes || ''}
                                                                                                                                                                                                                                                  onChange={(e) => setTx({ ...tx, notes: e.target.value })}
                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                </label>

                                                                                                                                                                                                                                                                      <div className="row">
                                                                                                                                                                                                                                                                              <button className="btn primary" onClick={() => onSave(tx)}>
                                                                                                                                                                                                                                                                                        حفظ
                                                                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                                                                        <button className="btn gray" onClick={onCancel}>
                                                                                                                                                                                                                                                                                                                  إلغاء
                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                      }
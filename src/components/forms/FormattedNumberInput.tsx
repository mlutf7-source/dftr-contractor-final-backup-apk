import { useEffect, useState } from 'react';

type Props = {
  label: string;
    value: number;
      onChange: (v: number) => void;
      };

      export default function FormattedNumberInput({
        label,
          value,
            onChange,
            }: Props) {
              const [text, setText] = useState('');

                useEffect(() => {
                    setText(
                          value
                                  ? value.toLocaleString('en-US', {
                                              maximumFractionDigits: 2,
                                                        })
                                                                : ''
                                                                    );
                                                                      }, [value]);

                                                                        const update = (v: string) => {
                                                                            const raw = v.replace(/,/g, '');
                                                                                if (raw && isNaN(Number(raw))) return;

                                                                                    onChange(Number(raw) || 0);
                                                                                      };

                                                                                        return (
                                                                                            <label className="field">
                                                                                                  <span>{label}</span>

                                                                                                        <input
                                                                                                                type="text"
                                                                                                                        inputMode="decimal"
                                                                                                                                value={text}
                                                                                                                                        autoComplete="off"
                                                                                                                                                onChange={(e) => update(e.target.value)}
                                                                                                                                                      />
                                                                                                                                                          </label>
                                                                                                                                                            );
                                                                                                                                                            }
type Props = {
    label: string;
      value: string | number;
        unit?: string;
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
          };

          export default function NumberInput({
            label,
              value,
                unit,
                  onChange,
                  }: Props) {
                    return (
                        <label className="field">

                              <span>
                                      {label}
                                              {unit ? ` (${unit})` : ''}
                                                    </span>

                                                          <input
                                                                  type="text"
                                                                          inputMode="decimal"
                                                                                  autoComplete="off"
                                                                                          value={value}
                                                                                                  onChange={onChange}
                                                                                                        />

                                                                                                            </label>
                                                                                                              );
                                                                                                              }

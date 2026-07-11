type Option = {
    value: string;
      label: string;
      };

      type Props = {
        label: string;
          value: string;
            options: Option[];
              onChange: (v: string) => void;
              };

              export default function SelectInput({
                label,
                  value,
                    options,
                      onChange,
                      }: Props) {
                        return (
                            <label className="field">

                                  <span>{label}</span>

                                        <select
                                                value={value}
                                                        onChange={(e) =>
                                                                  onChange(e.target.value)
                                                                          }
                                                                                >
                                                                                        {options.map((o) => (
                                                                                                  <option
                                                                                                              key={o.value}
                                                                                                                          value={o.value}
                                                                                                                                    >
                                                                                                                                                {o.label}
                                                                                                                                                          </option>
                                                                                                                                                                  ))}
                                                                                                                                                                        </select>

                                                                                                                                                                            </label>
                                                                                                                                                                              );
                                                                                                                                                                              }

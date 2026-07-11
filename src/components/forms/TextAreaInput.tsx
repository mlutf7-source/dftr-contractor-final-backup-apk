type Props = {
    label: string;
      value: string;
        rows?: number;
          placeholder?: string;
            onChange: (v: string) => void;
            };

            export default function TextAreaInput({
              label,
                value,
                  rows = 4,
                    placeholder = '',
                      onChange,
                      }: Props) {
                        return (
                            <label className="field">

                                  <span>{label}</span>

                                        <textarea
                                                rows={rows}
                                                        value={value}
                                                                placeholder={placeholder}
                                                                        onChange={(e) =>
                                                                                  onChange(e.target.value)
                                                                                          }
                                                                                                />

                                                                                                    </label>
                                                                                                      );
                                                                                                      }

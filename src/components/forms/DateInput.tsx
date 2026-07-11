type Props = {
    label: string;
      value: string;
        onChange: (v: string) => void;
        };

        export default function DateInput({
          label,
            value,
              onChange,
              }: Props) {
                return (
                    <label className="field">

                          <span>{label}</span>

                                <input
                                        type="date"
                                                value={value}
                                                        onChange={(e) =>
                                                                  onChange(e.target.value)
                                                                          }
                                                                                />

                                                                                    </label>
                                                                                      );
                                                                                      }

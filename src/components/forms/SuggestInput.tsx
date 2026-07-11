import { loadSuggestions, saveSuggestion } from '../../utils/suggestions';

type Props = {
  label: string;
    value: string;
      typeKey: string;
        onChange: (v: string) => void;
        };

        export default function SuggestInput({
          label,
            value,
              typeKey,
                onChange,
                }: Props) {
                  const listId = `list-${typeKey}`;
                    const items = loadSuggestions(typeKey);

                      return (
                          <label className="field">

                                <span>{label}</span>

                                      <input
                                              list={listId}
                                                      value={value}
                                                              autoComplete="off"
                                                                      onChange={(e) => onChange(e.target.value)}
                                                                              onBlur={() => {
                                                                                        const text = value.trim();
                                                                                                  if (text) saveSuggestion(typeKey, text);
                                                                                                          }}
                                                                                                                />

                                                                                                                      <datalist id={listId}>
                                                                                                                              {items.map((item) => (
                                                                                                                                        <option
                                                                                                                                                    key={item}
                                                                                                                                                                value={item}
                                                                                                                                                                          />
                                                                                                                                                                                  ))}
                                                                                                                                                                                        </datalist>

                                                                                                                                                                                            </label>
                                                                                                                                                                                              );
                                                                                                                                                                                              }
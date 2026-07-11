import type { ChangeEvent } from 'react';

type Props = {
  value: string;
    onChange: (v: string) => void;
    };

    export default function SearchBox({
      value,
        onChange,
        }: Props) {
          const change = (e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value);

                return (
                    <div className="search-box">

                          <input
                                  type="text"
                                          placeholder="🔍 بحث باسم المشروع أو المالك أو الموقع..."
                                                  value={value}
                                                          autoComplete="off"
                                                                  onChange={change}
                                                                        />

                                                                            </div>
                                                                              );
                                                                              }
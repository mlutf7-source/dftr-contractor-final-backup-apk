import { useState } from 'react';
import type { ReactNode } from 'react';

type Props = {
  title: string;
    children: ReactNode;
      defaultOpen?: boolean;
      };

      export default function CollapseCard({
        title,
          children,
            defaultOpen = false,
            }: Props) {
              const [open, setOpen] = useState(defaultOpen);

                return (
                    <div className="card">

                          <button
                                  type="button"
                                          className="collapse-title"
                                                  onClick={() => setOpen(!open)}
                                                        >
                                                                <strong>{title}</strong>

                                                                        <span>
                                                                                  {open ? '▲' : '▼'}
                                                                                          </span>
                                                                                                </button>

                                                                                                      {open && (
                                                                                                              <div className="collapse-body">
                                                                                                                        {children}
                                                                                                                                </div>
                                                                                                                                      )}

                                                                                                                                          </div>
                                                                                                                                            );
                                                                                                                                            }
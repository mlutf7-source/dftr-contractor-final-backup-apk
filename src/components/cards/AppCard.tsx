import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
    className?: string;
      title?: string;
        action?: ReactNode;
        };

        export default function AppCard({
          children,
            className = '',
              title,
                action,
                }: Props) {
                  return (
                      <div className={`card ${className}`}>
                            {(title || action) && (
                                    <div
                                              style={{
                                                          display: 'flex',
                                                                      justifyContent: 'space-between',
                                                                                  alignItems: 'center',
                                                                                              marginBottom: 14,
                                                                                                        }}
                                                                                                                >
                                                                                                                          {title && (
                                                                                                                                      <div
                                                                                                                                                    style={{
                                                                                                                                                                    flex: 1,
                                                                                                                                                                                    borderRight: '5px solid #0B3BB5',
                                                                                                                                                                                                    background: 'rgba(11,59,181,0.04)',
                                                                                                                                                                                                                    borderRadius: 10,
                                                                                                                                                                                                                                    padding: '10px 14px',
                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                            <h3
                                                                                                                                                                                                                                                                                            style={{
                                                                                                                                                                                                                                                                                                              margin: 0,
                                                                                                                                                                                                                                                                                                                                color: '#0B3BB5',
                                                                                                                                                                                                                                                                                                                                                  fontSize: '1rem',
                                                                                                                                                                                                                                                                                                                                                                    fontWeight: 700,
                                                                                                                                                                                                                                                                                                                                                                                    }}
                                                                                                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                                                                                                  {title}
                                                                                                                                                                                                                                                                                                                                                                                                                                </h3>
                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                      )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                {action}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {children}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
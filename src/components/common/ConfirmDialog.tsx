import type { ReactNode } from 'react';

type Props = {
  open: boolean;
    title?: string;
      message: string;
        confirmText?: string;
          cancelText?: string;
            onConfirm: () => void;
              onCancel: () => void;
                icon?: ReactNode;
                };

                export default function ConfirmDialog({
                  open,
                    title = 'تأكيد',
                      message,
                        confirmText = 'تأكيد',
                          cancelText = 'إلغاء',
                            onConfirm,
                              onCancel,
                                icon = '⚠️',
                                }: Props) {
                                  if (!open) return null;

                                    return (
                                        <div className="dialog-overlay">

                                              <div className="dialog-card">

                                                      <div
                                                                style={{
                                                                            fontSize: 46,
                                                                                        textAlign: 'center',
                                                                                                    marginBottom: 10,
                                                                                                              }}
                                                                                                                      >
                                                                                                                                {icon}
                                                                                                                                        </div>

                                                                                                                                                <h3
                                                                                                                                                          style={{
                                                                                                                                                                      margin: 0,
                                                                                                                                                                                  textAlign: 'center',
                                                                                                                                                                                            }}
                                                                                                                                                                                                    >
                                                                                                                                                                                                              {title}
                                                                                                                                                                                                                      </h3>

                                                                                                                                                                                                                              <p
                                                                                                                                                                                                                                        style={{
                                                                                                                                                                                                                                                    textAlign: 'center',
                                                                                                                                                                                                                                                                color: '#666',
                                                                                                                                                                                                                                                                            lineHeight: 1.8,
                                                                                                                                                                                                                                                                                        margin: '14px 0 18px',
                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                                                    {message}
                                                                                                                                                                                                                                                                                                                            </p>

                                                                                                                                                                                                                                                                                                                                    <div className="row">

                                                                                                                                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                                                                                                                                          className="btn danger"
                                                                                                                                                                                                                                                                                                                                                                      onClick={onConfirm}
                                                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                                                            {confirmText}
                                                                                                                                                                                                                                                                                                                                                                                                      </button>

                                                                                                                                                                                                                                                                                                                                                                                                                <button
                                                                                                                                                                                                                                                                                                                                                                                                                            className="btn gray"
                                                                                                                                                                                                                                                                                                                                                                                                                                        onClick={onCancel}
                                                                                                                                                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                                                                                                                                              {cancelText}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
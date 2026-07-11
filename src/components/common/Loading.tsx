type Props = {
    text?: string;
    };

    export default function Loading({
      text = 'جاري التحميل...',
      }: Props) {
        return (
            <div className="card">
                  <div
                          style={{
                                    display: 'flex',
                                              alignItems: 'center',
                                                        justifyContent: 'center',
                                                                  gap: 12,
                                                                            padding: 20,
                                                                                    }}
                                                                                          >
                                                                                                  <div className="loading-spinner" />

                                                                                                          <strong>{text}</strong>
                                                                                                                </div>
                                                                                                                    </div>
                                                                                                                      );
                                                                                                                      }

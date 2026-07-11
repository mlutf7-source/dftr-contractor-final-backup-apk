import type { ProjectStatus } from '../../models/types';

type Props = {
  projectName: string;
    ownerName: string;
      projectCode: string;
        status: ProjectStatus;
          startDate: string;
            currency: string;
              total: number | string;
              };

              const statusText: Record<ProjectStatus, string> = {
                active: 'جاري',
                  paused: 'متوقف',
                    completed: 'مكتمل',
                      archived: 'مؤرشف',
                      };

                      export default function HeroCard({
                        projectName,
                          ownerName,
                            projectCode,
                              status,
                                startDate,
                                  currency,
                                    total,
                                    }: Props) {
                                      return (
                                          <section className="hero-card">
                                                <div className="hero-top">
                                                        <div className="hero-status">
                                                                  <span className="status-dot" />
                                                                            {statusText[status]}
                                                                                    </div>

                                                                                            <div className="hero-icon">
                                                                                                      🏗️
                                                                                                              </div>
                                                                                                                    </div>

                                                                                                                          <h2>{projectName}</h2>

                                                                                                                                <div className="hero-owner">
                                                                                                                                        المالك: {ownerName || '-'}
                                                                                                                                              </div>

                                                                                                                                                    <small>{projectCode}</small>

                                                                                                                                                          <div className="hero-info">
                                                                                                                                                                  <div>
                                                                                                                                                                            <span>تاريخ البداية</span>
                                                                                                                                                                                      <strong>{startDate || '-'}</strong>
                                                                                                                                                                                              </div>

                                                                                                                                                                                                      <div>
                                                                                                                                                                                                                <span>العملة</span>
                                                                                                                                                                                                                          <strong>{currency}</strong>
                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                    <span>إجمالي المشروع</span>
                                                                                                                                                                                                                                                              <strong>{Number(total).toLocaleString()}</strong>
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                </section>
                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                  }
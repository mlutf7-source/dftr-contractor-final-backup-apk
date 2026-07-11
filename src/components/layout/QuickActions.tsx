import { Link } from 'react-router-dom';

type Props = {
  projectId: string;
  };

  const actions = [
    {
        icon: '👤',
            text: 'إضافة عملية للمالك',
                link: 'owner',
                  },
                    {
                        icon: '👷',
                            text: 'إضافة عملية للمقاول',
                                link: 'contractor',
                                  },
                                    {
                                        icon: '🏗️',
                                            text: 'إضافة عملية للباطن',
                                                link: 'subcontractors',
                                                  },
                                                    {
                                                        icon: '💰',
                                                            text: 'إضافة عملية للصندوق',
                                                                link: 'cashbox',
                                                                  },
                                                                  ];

                                                                  export default function QuickActions({
                                                                    projectId,
                                                                    }: Props) {
                                                                      return (
                                                                          <div className="card">

                                                                                <div className="section-title-box">
                                                                                        <h3>⚡ الإجراءات السريعة</h3>
                                                                                              </div>

                                                                                                    <div className="quick-grid">

                                                                                                            {actions.map((a) => (

                                                                                                                      <Link
                                                                                                                                  key={a.link}
                                                                                                                                              className="quick-action"
                                                                                                                                                          to={`/project/${projectId}/${a.link}`}
                                                                                                                                                                    >

                                                                                                                                                                                <span className="quick-icon">
                                                                                                                                                                                              {a.icon}
                                                                                                                                                                                                          </span>

                                                                                                                                                                                                                      <strong>{a.text}</strong>

                                                                                                                                                                                                                                </Link>

                                                                                                                                                                                                                                        ))}

                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                    }
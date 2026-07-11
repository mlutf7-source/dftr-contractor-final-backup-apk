import {
    Link,
      NavLink,
      } from 'react-router-dom';

      const tabs = [
        {
            to: 'owner',
                label: 'المالك',
                    icon: '👤',
                      },
                        {
                            to: 'contractor',
                                label: 'المقاول',
                                    icon: '👷',
                                      },
                                        {
                                            to: 'subcontractors',
                                                label: 'الباطن',
                                                    icon: '🏗️',
                                                      },
                                                        {
                                                            to: 'cashbox',
                                                                label: 'الصندوق',
                                                                    icon: '💰',
                                                                      },
                                                                        {
                                                                            to: 'documents',
                                                                                label: 'المستندات',
                                                                                    icon: '📂',
                                                                                      },
                                                                                        {
                                                                                            to: 'reports',
                                                                                                label: 'التقارير',
                                                                                                    icon: '📈',
                                                                                                      },
                                                                                                        {
                                                                                                            to: 'settings',
                                                                                                                label: 'الإعدادات',
                                                                                                                    icon: '⚙️',
                                                                                                                      },
                                                                                                                      ];

                                                                                                                      export default function TopTabs() {
                                                                                                                        const scrollToPageStart = () => {
                                                                                                                            setTimeout(() => {
                                                                                                                                  const el =
                                                                                                                                          document.getElementById('page-start');

                                                                                                                                                if (el) {
                                                                                                                                                        el.scrollIntoView({
                                                                                                                                                                  behavior: 'smooth',
                                                                                                                                                                            block: 'start',
                                                                                                                                                                                    });
                                                                                                                                                                                          }
                                                                                                                                                                                              }, 80);
                                                                                                                                                                                                };

                                                                                                                                                                                                  return (
                                                                                                                                                                                                      <nav className="top-tabs no-print">
                                                                                                                                                                                                            <Link
                                                                                                                                                                                                                    to="/"
                                                                                                                                                                                                                            className="top-tab-back"
                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                          <span>←</span>
                                                                                                                                                                                                                                                  <b>رجوع</b>
                                                                                                                                                                                                                                                        </Link>

                                                                                                                                                                                                                                                              {tabs.map((tab) => (
                                                                                                                                                                                                                                                                      <NavLink
                                                                                                                                                                                                                                                                                key={tab.to}
                                                                                                                                                                                                                                                                                          to={tab.to}
                                                                                                                                                                                                                                                                                                    onClick={scrollToPageStart}
                                                                                                                                                                                                                                                                                                              className={({ isActive }) =>
                                                                                                                                                                                                                                                                                                                          isActive ? 'active' : ''
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                                                                      <span>{tab.icon}</span>
                                                                                                                                                                                                                                                                                                                                                                <b>{tab.label}</b>
                                                                                                                                                                                                                                                                                                                                                                        </NavLink>
                                                                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                                                                  </nav>
                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                    }

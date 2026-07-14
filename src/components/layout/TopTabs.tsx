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

type TopTabsProps = {
  showProjectInfo: boolean;
  onShowProjectInfo: () => void;
  onHideProjectInfo: () => void;
};

export default function TopTabs({
  showProjectInfo,
  onShowProjectInfo,
  onHideProjectInfo,
}: TopTabsProps) {
  const openTab = () => {
    onHideProjectInfo();

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 80);
  };

  const showHome = () => {
    onShowProjectInfo();

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 80);
  };

  return (
    <nav className="top-tabs no-print">
      {showProjectInfo ? (
        <Link
          to="/"
          className="top-tab-back"
        >
          <span>←</span>
          <b>رجوع</b>
        </Link>
      ) : (
        <button
          type="button"
          className="top-tab-back"
          onClick={showHome}
        >
          <span>⌂</span>
          <b>الرئيسية</b>
        </button>
      )}

      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          onClick={openTab}
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

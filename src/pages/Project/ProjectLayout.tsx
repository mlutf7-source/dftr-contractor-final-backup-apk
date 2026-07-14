import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import MaterialPricesBanner from '../../components/cards/MaterialPricesBanner';

import type { Project } from '../../models/types';

import {
  getProject,
  saveProject,
} from '../../database/database';

import {
  getProjectSummary,
} from '../../database/calculations';

import {
  money,
} from '../../utils/currency';

import TopTabs from '../../components/layout/TopTabs';
import HeroCard from '../../components/layout/HeroCard';

import './ProjectLayout.css';

type FinanceCardProps = {
  title: string;
  value: number;
  status: string;
  color: string;
};

function FinanceCard({
  title,
  value,
  status,
  color,
}: FinanceCardProps) {
  const colorClass =
    color === 'red' ? 'red' : 'blue';

  return (
    <div className="finance-card">
      <span>{title}</span>

      <strong className={colorClass}>
        {money(value || 0, 'YER')}
      </strong>

      <i
        className={
          color === 'red'
            ? 'pill-red'
            : 'pill-green'
        }
      >
        {status || '-'}
      </i>
    </div>
  );
}

export default function ProjectLayout() {
  const { id = '' } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const fixedHeaderRef =
    useRef<HTMLDivElement | null>(null);

  const [fixedHeaderHeight, setFixedHeaderHeight] =
    useState(80);

  const [showProjectInfo, setShowProjectInfo] =
    useState(true);

  const isMaterialPricesPage =
    location.pathname.includes(
      '/material-prices'
    );

  const [p, setP] =
    useState<Project | null>(() =>
      getProject(id) || null
    );

  const refreshProject = useCallback(() => {
    const latest =
      getProject(id) || null;

    setP(latest);
  }, [id]);

  useEffect(() => {
    refreshProject();
  }, [refreshProject]);

  useEffect(() => {
    const handleFocus = () => {
      refreshProject();
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        refreshProject();
      }
    };

    window.addEventListener(
      'focus',
      handleFocus
    );

    document.addEventListener(
      'visibilitychange',
      handleVisibility
    );

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      );
    };
  }, [refreshProject]);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      const height =
        fixedHeaderRef.current?.offsetHeight || 70;

      setFixedHeaderHeight(height + 12);
    };

    updateHeaderHeight();

    window.addEventListener(
      'resize',
      updateHeaderHeight
    );

    return () => {
      window.removeEventListener(
        'resize',
        updateHeaderHeight
      );
    };
  }, [location.pathname]);

  const updateProject = (
    updated: Project
  ) => {
    const saved = saveProject({
      ...updated,
      updatedAt:
        updated.updatedAt ||
        new Date().toISOString(),
    });

    setP(saved);

    return saved;
  };

  if (!p) {
    return (
      <div className="project-page">
        <div className="project-container">
          <Link
            to="/"
            className="project-back-btn"
          >
            ← رجوع
          </Link>

          <div className="empty-state">
            المشروع غير موجود
          </div>
        </div>
      </div>
    );
  }

  const summary: any =
    getProjectSummary(p);

  const owner =
    summary?.owner || {
      displayBalance: 0,
      status: '-',
      color: 'blue',
    };

  const contractor =
    summary?.contractor || {
      displayBalance: 0,
      status: '-',
      color: 'blue',
    };

  const subcontractors =
    summary?.subcontractors || {
      displayBalance: 0,
      status: '-',
      color: 'blue',
    };

  const cashBox =
    summary?.cash || {
      displayBalance: 0,
      status: '-',
      color: 'blue',
    };

  const showProjectSummary =
    showProjectInfo &&
    !isMaterialPricesPage;

  const showMainProjectInfo = () => {
    setShowProjectInfo(true);

    if (isMaterialPricesPage) {
      navigate(`/project/${p.id}/owner`);
    }

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 80);
  };

  const hideMainProjectInfo = () => {
    setShowProjectInfo(false);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 80);
  };

  return (
    <div className="project-page">
      <div className="project-container">
        <div
          ref={fixedHeaderRef}
          className="no-print"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: '#f3f6ff',
            padding: '6px 10px 8px',
            boxShadow:
              '0 8px 18px rgba(15, 23, 42, .12)',
          }}
        >
          <TopTabs
            showProjectInfo={showProjectSummary}
            onShowProjectInfo={showMainProjectInfo}
            onHideProjectInfo={hideMainProjectInfo}
          />
        </div>

        <div
          className="no-print"
          style={{
            height: fixedHeaderHeight,
          }}
        />

        {showProjectSummary && (
          <>
            <MaterialPricesBanner project={p} />

            <HeroCard
              projectName={p.name}
              ownerName={p.ownerName}
              projectCode={p.code}
              status={p.status}
              startDate={p.startDate}
              currency="ريال يمني"
              total={money(
                owner.displayBalance || 0,
                'YER'
              )}
            />

            <div className="finance-grid">
              <FinanceCard
                title="حساب المالك"
                value={
                  owner.displayBalance || 0
                }
                status={
                  owner.status || '-'
                }
                color={
                  owner.color || 'blue'
                }
              />

              <FinanceCard
                title="حساب المقاول"
                value={
                  contractor.displayBalance || 0
                }
                status={
                  contractor.status || '-'
                }
                color={
                  contractor.color || 'blue'
                }
              />

              <FinanceCard
                title="مقاولو الباطن"
                value={
                  subcontractors.displayBalance || 0
                }
                status={
                  subcontractors.status || '-'
                }
                color={
                  subcontractors.color || 'blue'
                }
              />

              <FinanceCard
                title="الصندوق"
                value={
                  cashBox.displayBalance || 0
                }
                status={
                  cashBox.status || '-'
                }
                color={
                  cashBox.color || 'blue'
                }
              />
            </div>
          </>
        )}

        <div
          id="page-start"
          className="page-start-anchor"
          style={{
            scrollMarginTop:
              fixedHeaderHeight,
          }}
        />

        {!showProjectSummary && (
  <Outlet
    context={{
      project: p,
      setProject: updateProject,
      refreshProject,
    }}
  />
)}
      </div>
    </div>
  );
  }

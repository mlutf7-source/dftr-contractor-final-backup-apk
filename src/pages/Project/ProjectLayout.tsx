import {
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';
import MaterialPricesBanner from '../../components/cards/MaterialPricesBanner';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';

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

  return (
    <div className="project-page">
      <div className="project-container">
        <TopTabs />
<TopTabs />

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

        <div
          id="page-start"
          className="page-start-anchor"
        />

        <Outlet
          context={{
            project: p,
            setProject: updateProject,
            refreshProject,
          }}
        />
      </div>
    </div>
  );
      }

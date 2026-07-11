import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  ChangeEvent,
} from 'react';

import { Link } from 'react-router-dom';
import './Home.css';

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../../database/database';

import type { Project } from '../../models/types';

import SearchBox from './SearchBox';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import PageHeader from '../../components/layout/PageHeader';

import {
  restoreBackupFromFile,
} from '../../utils/backup';

export default function Home() {
  const [projects, setProjects] =
    useState<Project[]>(getProjects());

  const [search, setSearch] =
    useState('');

  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState<Project | null>(null);

  const backupFileRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.history.pushState(
      null,
      '',
      window.location.href
    );

    const handleBack = () => {
      const exit = confirm(
        'هل تريد الخروج من التطبيق؟'
      );

      if (!exit) {
        window.history.pushState(
          null,
          '',
          window.location.href
        );
      }
    };

    window.addEventListener(
      'popstate',
      handleBack
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handleBack
      );
    };
  }, []);

  const refresh = () =>
    setProjects(getProjects());

  const save = (
    data: Partial<Project>
  ) => {
    if (editing) {
      updateProject(editing.id, data);
    } else {
      createProject(data);
    }

    refresh();
    setEditing(null);
    setShowForm(false);
  };

  const remove = (id: string) => {
    if (
      !confirm(
        'هل تريد نقل هذا المشروع إلى سلة المحذوفات؟ يمكنك استعادته لاحقًا من سلة المحذوفات.'
      )
    ) {
      return;
    }

    deleteProject(id);
    refresh();
  };

  const edit = (project: Project) => {
    setEditing(project);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openRestoreBackup = () => {
    backupFileRef.current?.click();
  };

  const handleRestoreBackup = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const ok = confirm(
      'سيتم استعادة النسخة الاحتياطية وقد يتم استبدال البيانات الحالية. هل تريد المتابعة؟'
    );

    if (!ok) {
      e.target.value = '';
      return;
    }

    try {
      await restoreBackupFromFile(file);

      alert(
        'تمت استعادة النسخة الاحتياطية بنجاح. سيتم تحديث التطبيق الآن.'
      );

      window.location.reload();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'فشل استعادة النسخة الاحتياطية'
      );
    } finally {
      e.target.value = '';
    }
  };

  const filtered = useMemo(() => {
    const sorted = [...projects].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    const s =
      search.trim().toLowerCase();

    if (!s) return sorted;

    return sorted.filter(project =>
      [
        project.name,
        project.ownerName,
        project.location,
        project.code,
      ]
        .join(' ')
        .toLowerCase()
        .includes(s)
    );
  }, [projects, search]);

  const hasProjects =
    projects.length > 0;

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-top-actions no-print">
          <Link
            to="/app-profile"
            className="home-action-link"
          >
            🧾 بيانات الكليشة
          </Link>

          <Link
            to="/trash"
            className="home-action-link danger-link"
          >
            🗑️ سلة المحذوفات
          </Link>
        </div>

        <PageHeader
          title="دفتر المقاول"
          subtitle="إدارة المشاريع والحسابات"
        />

        <SearchBox
          value={search}
          onChange={setSearch}
        />

        {showForm && (
          <ProjectForm
            initial={editing || {}}
            onSave={save}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
          />
        )}

        <div className="project-grid">
          {filtered.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={edit}
              onDelete={remove}
            />
          ))}

          {!hasProjects && !showForm && (
            <div className="empty-home">
              <h3>
                لا توجد مشاريع حتى الآن
              </h3>

              <p>
                قم بإضافة مشروع للدخول إلى
                صفحة بيانات التطبيق، أو اضغط
                على الزر التالي لاستعادة نسخة
                احتياطية.
              </p>

              <div className="row">
                <button
                  className="btn primary"
                  onClick={() => {
                    setEditing(null);
                    setShowForm(true);

                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  + إضافة مشروع
                </button>

                <button
                  className="btn gray"
                  onClick={openRestoreBackup}
                >
                  📥 استعادة نسخة احتياطية
                </button>
              </div>
            </div>
          )}

          {hasProjects && !filtered.length && (
            <div className="empty-home">
              لا توجد نتائج مطابقة للبحث
            </div>
          )}
        </div>

        <input
          ref={backupFileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={handleRestoreBackup}
        />

        <button
          className="fab no-print"
          onClick={() => {
            setEditing(null);
            setShowForm(true);

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
        }

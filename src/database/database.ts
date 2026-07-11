import type {
    AppProfile,
      Project,
      } from '../models/types';

      import {
        DEFAULT_RATES,
          STORAGE,
          } from '../utils/constants';

          import {
            now,
              projectCode,
                uid,
                } from '../utils/format';

                const read = <T,>(
                  key: string,
                    fallback: T
                    ): T => {
                      try {
                          return JSON.parse(
                                localStorage.getItem(key) ||
                                        JSON.stringify(fallback)
                                            );
                                              } catch {
                                                  return fallback;
                                                    }
                                                    };

                                                    const write = (
                                                      key: string,
                                                        value: unknown
                                                        ) =>
                                                          localStorage.setItem(
                                                              key,
                                                                  JSON.stringify(value)
                                                                    );

                                                                    export const getProjects = () =>
                                                                      read<Project[]>(STORAGE.PROJECTS, []);

                                                                      export const getProject = (id: string) =>
                                                                        getProjects().find(
                                                                            project => project.id === id
                                                                              );

                                                                              export const saveProject = (
                                                                                project: Project
                                                                                ) => {
                                                                                  const list = getProjects();
                                                                                    const index = list.findIndex(
                                                                                        p => p.id === project.id
                                                                                          );

                                                                                            if (index >= 0) {
                                                                                                list[index] = project;
                                                                                                  } else {
                                                                                                      list.unshift(project);
                                                                                                        }

                                                                                                          write(STORAGE.PROJECTS, list);

                                                                                                            return project;
                                                                                                            };

                                                                                                            export function updateProject(
                                                                                                              id: string,
                                                                                                                data: Partial<Project>
                                                                                                                ): Project | undefined;

                                                                                                                export function updateProject(
                                                                                                                  project: Project
                                                                                                                  ): Project;

                                                                                                                  export function updateProject(
                                                                                                                    idOrProject: string | Project,
                                                                                                                      data: Partial<Project> = {}
                                                                                                                      ) {
                                                                                                                        if (typeof idOrProject === 'string') {
                                                                                                                            const project = getProject(idOrProject);

                                                                                                                                if (!project) return undefined;

                                                                                                                                    return saveProject({
                                                                                                                                          ...project,
                                                                                                                                                ...data,
                                                                                                                                                      updatedAt: now(),
                                                                                                                                                          });
                                                                                                                                                            }

                                                                                                                                                              return saveProject({
                                                                                                                                                                  ...idOrProject,
                                                                                                                                                                      updatedAt: now(),
                                                                                                                                                                        });
                                                                                                                                                                        }

                                                                                                                                                                        export const createProject = (
                                                                                                                                                                          data: Partial<Project>
                                                                                                                                                                          ): Project => {
                                                                                                                                                                            const list = getProjects();

                                                                                                                                                                              const project: Project = {
                                                                                                                                                                                  id: uid(),
                                                                                                                                                                                      code: projectCode(list.length),

                                                                                                                                                                                          name: '',
                                                                                                                                                                                              ownerName: '',
                                                                                                                                                                                                  ownerPhone: '',

                                                                                                                                                                                                      location: '',
                                                                                                                                                                                                          area: '',
                                                                                                                                                                                                              startDate: '',
                                                                                                                                                                                                                  notes: '',

                                                                                                                                                                                                                      status: 'active',

                                                                                                                                                                                                                          exchangeRates: DEFAULT_RATES,

                                                                                                                                                                                                                              transactions: [],
                                                                                                                                                                                                                                  subcontractors: [],
                                                                                                                                                                                                                                      documents: [],

                                                                                                                                                                                                                                          createdAt: now(),
                                                                                                                                                                                                                                              updatedAt: now(),

                                                                                                                                                                                                                                                  ...data,
                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                      saveProject(project);

                                                                                                                                                                                                                                                        return project;
                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                        export const deleteProject = (
                                                                                                                                                                                                                                                          id: string
                                                                                                                                                                                                                                                          ) => {
                                                                                                                                                                                                                                                            const list = getProjects();
                                                                                                                                                                                                                                                              const trash = read<Project[]>(
                                                                                                                                                                                                                                                                  STORAGE.TRASH,
                                                                                                                                                                                                                                                                      []
                                                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                                                          const project = list.find(
                                                                                                                                                                                                                                                                              p => p.id === id
                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                  if (!project) return;

                                                                                                                                                                                                                                                                                    write(
                                                                                                                                                                                                                                                                                        STORAGE.PROJECTS,
                                                                                                                                                                                                                                                                                            list.filter(p => p.id !== id)
                                                                                                                                                                                                                                                                                              );

                                                                                                                                                                                                                                                                                                write(
                                                                                                                                                                                                                                                                                                    STORAGE.TRASH,
                                                                                                                                                                                                                                                                                                        [
                                                                                                                                                                                                                                                                                                              {
                                                                                                                                                                                                                                                                                                                      ...project,
                                                                                                                                                                                                                                                                                                                              updatedAt: now(),
                                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                                          ...trash,
                                                                                                                                                                                                                                                                                                                                              ]
                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                                                export const getTrash = () =>
                                                                                                                                                                                                                                                                                                                                                  read<Project[]>(STORAGE.TRASH, []);

                                                                                                                                                                                                                                                                                                                                                  export const restoreProject = (
                                                                                                                                                                                                                                                                                                                                                    id: string
                                                                                                                                                                                                                                                                                                                                                    ) => {
                                                                                                                                                                                                                                                                                                                                                      const trash = getTrash();
                                                                                                                                                                                                                                                                                                                                                        const project = trash.find(
                                                                                                                                                                                                                                                                                                                                                            p => p.id === id
                                                                                                                                                                                                                                                                                                                                                              );

                                                                                                                                                                                                                                                                                                                                                                if (!project) return;

                                                                                                                                                                                                                                                                                                                                                                  saveProject({
                                                                                                                                                                                                                                                                                                                                                                      ...project,
                                                                                                                                                                                                                                                                                                                                                                          updatedAt: now(),
                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                              write(
                                                                                                                                                                                                                                                                                                                                                                                  STORAGE.TRASH,
                                                                                                                                                                                                                                                                                                                                                                                      trash.filter(p => p.id !== id)
                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                                                                                                                        export const removeProjectForever = (
                                                                                                                                                                                                                                                                                                                                                                                          id: string
                                                                                                                                                                                                                                                                                                                                                                                          ) =>
                                                                                                                                                                                                                                                                                                                                                                                            write(
                                                                                                                                                                                                                                                                                                                                                                                                STORAGE.TRASH,
                                                                                                                                                                                                                                                                                                                                                                                                    getTrash().filter(p => p.id !== id)
                                                                                                                                                                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                                                                                                                                                                      export const emptyTrash = () =>
                                                                                                                                                                                                                                                                                                                                                                                                        write(STORAGE.TRASH, []);

                                                                                                                                                                                                                                                                                                                                                                                                        export const getAppProfile = () =>
                                                                                                                                                                                                                                                                                                                                                                                                          read<AppProfile>(
                                                                                                                                                                                                                                                                                                                                                                                                              STORAGE.APP_PROFILE,
                                                                                                                                                                                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                                                                                                                                                                                        officeName: '',
                                                                                                                                                                                                                                                                                                                                                                                                                              contractorName: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                    phone1: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                          phone2: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                                location: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                                      logo: '',
                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                                                                                                                                                                            export const saveAppProfile = (
                                                                                                                                                                                                                                                                                                                                                                                                                                                              profile: AppProfile
                                                                                                                                                                                                                                                                                                                                                                                                                                                              ) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                write(STORAGE.APP_PROFILE, profile);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                  return profile;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  };

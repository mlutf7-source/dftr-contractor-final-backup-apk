const BACKUP_PREFIX = 'dftr-';

export type BackupFile = {
  app: string;
    version: number;
      createdAt: string;
        data: Record<string, string>;
        };

        const getTodayName = () => {
          const d = new Date();

            const yyyy = d.getFullYear();
              const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');

                  return `${yyyy}-${mm}-${dd}`;
                  };

                  export function createBackupFile() {
                    const data: Record<string, string> = {};

                      for (let i = 0; i < localStorage.length; i++) {
                          const key = localStorage.key(i);

                              if (!key) continue;

                                  if (key.startsWith(BACKUP_PREFIX)) {
                                        const value = localStorage.getItem(key);

                                              if (value !== null) {
                                                      data[key] = value;
                                                            }
                                                                }
                                                                  }

                                                                    const backup: BackupFile = {
                                                                        app: 'دفتر المقاول',
                                                                            version: 1,
                                                                                createdAt: new Date().toISOString(),
                                                                                    data,
                                                                                      };

                                                                                        return backup;
                                                                                        }

                                                                                        export function downloadBackup() {
                                                                                          const backup = createBackupFile();

                                                                                            const json = JSON.stringify(backup, null, 2);

                                                                                              const blob = new Blob([json], {
                                                                                                  type: 'application/json;charset=utf-8',
                                                                                                    });

                                                                                                      const url = URL.createObjectURL(blob);

                                                                                                        const a = document.createElement('a');

                                                                                                          a.href = url;
                                                                                                            a.download = `dftr-backup-${getTodayName()}.json`;

                                                                                                              document.body.appendChild(a);

                                                                                                                a.click();

                                                                                                                  document.body.removeChild(a);

                                                                                                                    URL.revokeObjectURL(url);
                                                                                                                    }

                                                                                                                    export async function restoreBackupFromFile(
                                                                                                                      file: File
                                                                                                                      ) {
                                                                                                                        const text = await file.text();

                                                                                                                          let parsed: BackupFile;

                                                                                                                            try {
                                                                                                                                parsed = JSON.parse(text);
                                                                                                                                  } catch {
                                                                                                                                      throw new Error(
                                                                                                                                            'ملف النسخة الاحتياطية غير صالح'
                                                                                                                                                );
                                                                                                                                                  }

                                                                                                                                                    if (
                                                                                                                                                        !parsed ||
                                                                                                                                                            parsed.app !== 'دفتر المقاول' ||
                                                                                                                                                                !parsed.data ||
                                                                                                                                                                    typeof parsed.data !== 'object'
                                                                                                                                                                      ) {
                                                                                                                                                                          throw new Error(
                                                                                                                                                                                'هذا الملف ليس نسخة احتياطية صحيحة للتطبيق'
                                                                                                                                                                                    );
                                                                                                                                                                                      }

                                                                                                                                                                                        Object.entries(parsed.data).forEach(
                                                                                                                                                                                            ([key, value]) => {
                                                                                                                                                                                                  if (
                                                                                                                                                                                                          key.startsWith(BACKUP_PREFIX) &&
                                                                                                                                                                                                                  typeof value === 'string'
                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                localStorage.setItem(key, value);
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                              return true;
                                                                                                                                                                                                                                              }
import {
  Filesystem,
  Directory,
  Encoding,
} from '@capacitor/filesystem';

import { Share } from '@capacitor/share';

const BACKUP_PREFIX = 'dftr-';

const APP_FOLDER = 'دفتر المقاول';
const BACKUP_FOLDER = 'دفتر المقاول/النسخ الاحتياطية';

const EXCLUDED_KEYS = [
  'dftr-license-state',
  'dftr-device-code',
];

export type BackupFile = {
  app: string;
  version: number;
  createdAt: string;
  data: Record<string, string>;
};

const getDateTimeName = () => {
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}-${hh}-${min}`;
};

const shouldBackupKey = (key: string) => {
  if (!key.startsWith(BACKUP_PREFIX)) {
    return false;
  }

  if (EXCLUDED_KEYS.includes(key)) {
    return false;
  }

  return true;
};

const ensureAppFolders = async () => {
  try {
    await Filesystem.mkdir({
      path: APP_FOLDER,
      directory: Directory.Documents,
      recursive: true,
    });
  } catch {
    // المجلد قد يكون موجودًا مسبقًا
  }

  try {
    await Filesystem.mkdir({
      path: BACKUP_FOLDER,
      directory: Directory.Documents,
      recursive: true,
    });
  } catch {
    // المجلد قد يكون موجودًا مسبقًا
  }
};

export function createBackupFile() {
  const data: Record<string, string> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key) continue;

    if (shouldBackupKey(key)) {
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

export async function downloadBackup() {
  const backup = createBackupFile();

  const json = JSON.stringify(backup, null, 2);

  const fileName =
    `dftr-backup-${getDateTimeName()}.json`;

  const filePath =
    `${BACKUP_FOLDER}/${fileName}`;

  try {
    await ensureAppFolders();

    await Filesystem.writeFile({
      path: filePath,
      data: json,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
    });

    const fileUri =
      await Filesystem.getUri({
        path: filePath,
        directory: Directory.Documents,
      });

    await Share.share({
      title: 'نسخة احتياطية - دفتر المقاول',
      text:
        'تم إنشاء نسخة احتياطية من بيانات تطبيق دفتر المقاول',
      url: fileUri.uri,
      dialogTitle:
        'مشاركة أو حفظ النسخة الاحتياطية',
    });

    return filePath;
  } catch {
    const blob = new Blob([json], {
      type: 'application/json;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    return fileName;
  }
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
        shouldBackupKey(key) &&
        typeof value === 'string'
      ) {
        localStorage.setItem(key, value);
      }
    }
  );

  return true;
      }

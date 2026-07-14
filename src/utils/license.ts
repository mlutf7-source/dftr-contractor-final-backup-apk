import { Device } from '@capacitor/device';

const LICENSE_KEY =
  'dftr-license-state';

const FALLBACK_DEVICE_KEY =
  'dftr-device-code';

const LICENSE_API_URL =
  'https://script.google.com/macros/s/AKfycbylNT0j_WFH5xLK25mmf6j7y2w27zrbqJagpVwezIeMuJp8U02cfiWxk-tiLk4k4avf/exec';

const APP_VERSION = '1.0.0';

export type LicenseState = {
  deviceCode: string;
  activated: boolean;
  activatedAt?: string;
  customerName?: string;

  trialStartedAt: string;
  trialEndsAt: string;
  trialExpired: boolean;
  trialDaysLeft: number;

  status?:
    | 'new_trial'
    | 'trial_active'
    | 'trial_expired'
    | 'activated'
    | 'offline'
    | 'error';

  message?: string;
  lastCheckAt?: string;
};

type RemoteLicenseResponse = {
  ok: boolean;
  status?:
    | 'new_trial'
    | 'trial_active'
    | 'trial_expired'
    | 'activated';

  deviceCode?: string;
  trialStart?: string;
  trialEnd?: string;
  activated?: boolean;
  trialExpired?: boolean;
  daysLeft?: number;
  message?: string;
};

const cleanCode = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();

const formatDeviceCode = (
  value: string
) => {
  const clean =
    cleanCode(value).slice(0, 24);

  return (
    clean
      .match(/.{1,4}/g)
      ?.join('-') || clean
  );
};

const createFallbackCode = () => {
  const existing =
    localStorage.getItem(
      FALLBACK_DEVICE_KEY
    );

  if (existing) {
    return existing;
  }

  const random =
    crypto.randomUUID?.() ||
    `${Date.now()}-${Math.random()}`;

  const code =
    formatDeviceCode(
      `DFTR-${random}`
    );

  localStorage.setItem(
    FALLBACK_DEVICE_KEY,
    code
  );

  return code;
};

const normalizeDate = (
  value?: string
) => {
  if (!value) {
    return new Date().toISOString();
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return new Date().toISOString();
  }

  return date.toISOString();
};

const todayIso = () =>
  new Date().toISOString();

const saveLocalState = (
  state: LicenseState
) => {
  localStorage.setItem(
    LICENSE_KEY,
    JSON.stringify(state)
  );
};

const readLocalState = () => {
  try {
    const saved =
      localStorage.getItem(
        LICENSE_KEY
      );

    if (!saved) {
      return null;
    }

    return JSON.parse(
      saved
    ) as Partial<LicenseState>;
  } catch {
    return null;
  }
};

const makeApiUrl = (
  action: string,
  params: Record<string, string>
) => {
  const url =
    new URL(LICENSE_API_URL);

  url.searchParams.set(
    'action',
    action
  );

  Object.entries(params).forEach(
    ([key, value]) => {
      url.searchParams.set(
        key,
        value
      );
    }
  );

  return url.toString();
};

export async function getDeviceCode() {
  try {
    const info =
      await Device.getId();

    if (info.identifier) {
      return formatDeviceCode(
        `DFTR-${info.identifier}`
      );
    }

    return createFallbackCode();
  } catch {
    return createFallbackCode();
  }
}

const remoteCheckDevice =
  async (
    deviceCode: string
  ): Promise<RemoteLicenseResponse> => {
    const url =
      makeApiUrl('check', {
        deviceCode,
        appVersion: APP_VERSION,
      });

    const res =
      await fetch(url, {
        method: 'GET',
        cache: 'no-store',
      });

    if (!res.ok) {
      throw new Error(
        'تعذر الاتصال بخادم التفعيل'
      );
    }

    return (
      await res.json()
    ) as RemoteLicenseResponse;
  };

const remoteActivateDevice =
  async (
    deviceCode: string,
    activationCode: string
  ): Promise<RemoteLicenseResponse> => {
    const url =
      makeApiUrl('activate', {
        deviceCode,
        activationCode,
        appVersion: APP_VERSION,
      });

    const res =
      await fetch(url, {
        method: 'GET',
        cache: 'no-store',
      });

    if (!res.ok) {
      throw new Error(
        'تعذر الاتصال بخادم التفعيل'
      );
    }

    return (
      await res.json()
    ) as RemoteLicenseResponse;
  };

const mapRemoteToState = (
  remote: RemoteLicenseResponse,
  deviceCode: string,
  oldState?: Partial<LicenseState> | null
): LicenseState => {
  const activated =
    Boolean(remote.activated) ||
    remote.status === 'activated';

  const trialExpired =
    Boolean(remote.trialExpired) ||
    remote.status === 'trial_expired';

  const trialDaysLeft =
    Number(remote.daysLeft || 0);

  const state: LicenseState = {
    deviceCode:
      remote.deviceCode || deviceCode,

    activated,

    activatedAt:
      activated
        ? oldState?.activatedAt ||
          todayIso()
        : oldState?.activatedAt,

    customerName:
      oldState?.customerName || '',

    trialStartedAt:
      normalizeDate(
        remote.trialStart
      ),

    trialEndsAt:
      normalizeDate(
        remote.trialEnd
      ),

    trialExpired,
    trialDaysLeft,

    status:
      remote.status ||
      (activated
        ? 'activated'
        : trialExpired
          ? 'trial_expired'
          : 'trial_active'),

    message:
      remote.message || '',

    lastCheckAt:
      todayIso(),
  };

  saveLocalState(state);

  return state;
};

const makeOfflineState = (
  deviceCode: string,
  oldState?: Partial<LicenseState> | null,
  message =
    'تعذر الاتصال بخادم التفعيل'
): LicenseState => {
  const now =
    new Date();

  const trialEnds =
    oldState?.trialEndsAt
      ? new Date(
          oldState.trialEndsAt
        )
      : now;

  const diff =
    trialEnds.getTime() -
    now.getTime();

  const daysLeft =
    Math.max(
      0,
      Math.ceil(
        diff /
          (1000 * 60 * 60 * 24)
      )
    );

  const activated =
    Boolean(oldState?.activated);

  const state: LicenseState = {
    deviceCode,

    activated,

    activatedAt:
      oldState?.activatedAt,

    customerName:
      oldState?.customerName || '',

    trialStartedAt:
      normalizeDate(
        oldState?.trialStartedAt
      ),

    trialEndsAt:
      normalizeDate(
        oldState?.trialEndsAt
      ),

    trialExpired:
      !activated && daysLeft <= 0,

    trialDaysLeft:
      activated ? 0 : daysLeft,

    status:
      activated
        ? 'activated'
        : 'offline',

    message,

    lastCheckAt:
      oldState?.lastCheckAt ||
      todayIso(),
  };

  saveLocalState(state);

  return state;
};

export async function getLicenseState():
  Promise<LicenseState> {
  const deviceCode =
    await getDeviceCode();

  const oldState =
    readLocalState();

  try {
    const remote =
      await remoteCheckDevice(
        deviceCode
      );

    if (!remote.ok) {
      return makeOfflineState(
        deviceCode,
        oldState,
        remote.message ||
          'تعذر فحص حالة التفعيل'
      );
    }

    return mapRemoteToState(
      remote,
      deviceCode,
      oldState
    );
  } catch (error) {
    return makeOfflineState(
      deviceCode,
      oldState,
      error instanceof Error
        ? error.message
        : 'تعذر الاتصال بخادم التفعيل'
    );
  }
}

export async function saveActivatedLicense(
  activationCode = '',
  customerName = ''
) {
  const deviceCode =
    await getDeviceCode();

  const oldState =
    readLocalState();

  if (!activationCode.trim()) {
    const state =
      makeOfflineState(
        deviceCode,
        oldState,
        'أدخل كود التفعيل'
      );

    return {
      ...state,
      activated: false,
      status: 'error' as const,
      message:
        'أدخل كود التفعيل',
    };
  }

  try {
    const remote =
      await remoteActivateDevice(
        deviceCode,
        activationCode.trim()
      );

    if (!remote.ok) {
      const state =
        makeOfflineState(
          deviceCode,
          oldState,
          remote.message ||
            'كود التفعيل غير صحيح'
        );

      return {
        ...state,
        activated: false,
        status: 'error' as const,
        message:
          remote.message ||
          'كود التفعيل غير صحيح',
      };
    }

    const state:
      LicenseState = {
        deviceCode,

        activated: true,

        activatedAt:
          todayIso(),

        customerName,

        trialStartedAt:
          normalizeDate(
            remote.trialStart ||
              oldState?.trialStartedAt
          ),

        trialEndsAt:
          normalizeDate(
            remote.trialEnd ||
              oldState?.trialEndsAt
          ),

        trialExpired: false,

        trialDaysLeft:
          Number(
            remote.daysLeft || 0
          ),

        status: 'activated',

        message:
          remote.message ||
          'تم تفعيل التطبيق بنجاح',

        lastCheckAt:
          todayIso(),
      };

    saveLocalState(state);

    return state;
  } catch (error) {
    const state =
      makeOfflineState(
        deviceCode,
        oldState,
        error instanceof Error
          ? error.message
          : 'تعذر الاتصال بخادم التفعيل'
      );

    return {
      ...state,
      activated: false,
      status: 'error' as const,
      message:
        error instanceof Error
          ? error.message
          : 'تعذر الاتصال بخادم التفعيل',
    };
  }
}

export function clearLicense() {
  localStorage.removeItem(
    LICENSE_KEY
  );
}

export function canUseApp(
  state: LicenseState
) {
  return (
    state.activated ||
    !state.trialExpired
  );
    }

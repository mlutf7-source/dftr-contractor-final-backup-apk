import { Device } from '@capacitor/device';

const LICENSE_KEY = 'dftr-license-state';
const FALLBACK_DEVICE_KEY = 'dftr-device-code';

const TRIAL_DAYS = 3;

export type LicenseState = {
  deviceCode: string;
    activated: boolean;
      activatedAt?: string;
        customerName?: string;

          trialStartedAt: string;
            trialEndsAt: string;
              trialExpired: boolean;
                trialDaysLeft: number;
                };

                const cleanCode = (value: string) =>
                  value
                      .replace(/[^a-zA-Z0-9]/g, '')
                          .toUpperCase();

                          const formatDeviceCode = (value: string) => {
                            const clean = cleanCode(value).slice(0, 24);

                              return clean
                                  .match(/.{1,4}/g)
                                      ?.join('-') || clean;
                                      };

                                      const createFallbackCode = () => {
                                        const existing =
                                            localStorage.getItem(FALLBACK_DEVICE_KEY);

                                              if (existing) {
                                                  return existing;
                                                    }

                                                      const random =
                                                          crypto.randomUUID?.() ||
                                                              `${Date.now()}-${Math.random()}`;

                                                                const code =
                                                                    formatDeviceCode(`DFTR-${random}`);

                                                                      localStorage.setItem(
                                                                          FALLBACK_DEVICE_KEY,
                                                                              code
                                                                                );

                                                                                  return code;
                                                                                  };

                                                                                  const addDays = (date: Date, days: number) => {
                                                                                    const result = new Date(date);
                                                                                      result.setDate(result.getDate() + days);
                                                                                        return result;
                                                                                        };

                                                                                        const getTrialInfo = (
                                                                                          trialStartedAt?: string
                                                                                          ) => {
                                                                                            const start =
                                                                                                trialStartedAt
                                                                                                      ? new Date(trialStartedAt)
                                                                                                            : new Date();

                                                                                                              const end =
                                                                                                                  addDays(start, TRIAL_DAYS);

                                                                                                                    const now = new Date();

                                                                                                                      const diff =
                                                                                                                          end.getTime() - now.getTime();

                                                                                                                            const daysLeft =
                                                                                                                                Math.max(
                                                                                                                                      0,
                                                                                                                                            Math.ceil(diff / (1000 * 60 * 60 * 24))
                                                                                                                                                );

                                                                                                                                                  return {
                                                                                                                                                      trialStartedAt: start.toISOString(),
                                                                                                                                                          trialEndsAt: end.toISOString(),
                                                                                                                                                              trialExpired: diff <= 0,
                                                                                                                                                                  trialDaysLeft: daysLeft,
                                                                                                                                                                    };
                                                                                                                                                                    };

                                                                                                                                                                    export async function getDeviceCode() {
                                                                                                                                                                      try {
                                                                                                                                                                          const info = await Device.getId();

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

                                                                                                                                                                                                                  export async function getLicenseState():
                                                                                                                                                                                                                    Promise<LicenseState> {
                                                                                                                                                                                                                      const deviceCode =
                                                                                                                                                                                                                          await getDeviceCode();

                                                                                                                                                                                                                            const saved =
                                                                                                                                                                                                                                localStorage.getItem(LICENSE_KEY);

                                                                                                                                                                                                                                  if (!saved) {
                                                                                                                                                                                                                                      const trial =
                                                                                                                                                                                                                                            getTrialInfo();

                                                                                                                                                                                                                                                const state: LicenseState = {
                                                                                                                                                                                                                                                      deviceCode,
                                                                                                                                                                                                                                                            activated: false,
                                                                                                                                                                                                                                                                  ...trial,
                                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                                          localStorage.setItem(
                                                                                                                                                                                                                                                                                LICENSE_KEY,
                                                                                                                                                                                                                                                                                      JSON.stringify(state)
                                                                                                                                                                                                                                                                                          );

                                                                                                                                                                                                                                                                                              return state;
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                  try {
                                                                                                                                                                                                                                                                                                      const parsed =
                                                                                                                                                                                                                                                                                                            JSON.parse(saved) as Partial<LicenseState>;

                                                                                                                                                                                                                                                                                                                const trial =
                                                                                                                                                                                                                                                                                                                      getTrialInfo(parsed.trialStartedAt);

                                                                                                                                                                                                                                                                                                                          const state: LicenseState = {
                                                                                                                                                                                                                                                                                                                                deviceCode,
                                                                                                                                                                                                                                                                                                                                      activated: Boolean(parsed.activated),
                                                                                                                                                                                                                                                                                                                                            activatedAt: parsed.activatedAt,
                                                                                                                                                                                                                                                                                                                                                  customerName: parsed.customerName,
                                                                                                                                                                                                                                                                                                                                                        ...trial,
                                                                                                                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                                                                                                                                localStorage.setItem(
                                                                                                                                                                                                                                                                                                                                                                      LICENSE_KEY,
                                                                                                                                                                                                                                                                                                                                                                            JSON.stringify(state)
                                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                                    return state;
                                                                                                                                                                                                                                                                                                                                                                                      } catch {
                                                                                                                                                                                                                                                                                                                                                                                          const trial =
                                                                                                                                                                                                                                                                                                                                                                                                getTrialInfo();

                                                                                                                                                                                                                                                                                                                                                                                                    return {
                                                                                                                                                                                                                                                                                                                                                                                                          deviceCode,
                                                                                                                                                                                                                                                                                                                                                                                                                activated: false,
                                                                                                                                                                                                                                                                                                                                                                                                                      ...trial,
                                                                                                                                                                                                                                                                                                                                                                                                                          };
                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                            export async function saveActivatedLicense(
                                                                                                                                                                                                                                                                                                                                                                                                                              customerName = ''
                                                                                                                                                                                                                                                                                                                                                                                                                              ) {
                                                                                                                                                                                                                                                                                                                                                                                                                                const oldState =
                                                                                                                                                                                                                                                                                                                                                                                                                                    await getLicenseState();

                                                                                                                                                                                                                                                                                                                                                                                                                                      const state: LicenseState = {
                                                                                                                                                                                                                                                                                                                                                                                                                                          ...oldState,
                                                                                                                                                                                                                                                                                                                                                                                                                                              activated: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                  activatedAt: new Date().toISOString(),
                                                                                                                                                                                                                                                                                                                                                                                                                                                      customerName,
                                                                                                                                                                                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                                                                                                                                                                                          localStorage.setItem(
                                                                                                                                                                                                                                                                                                                                                                                                                                                              LICENSE_KEY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  JSON.stringify(state)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                                                                                                                                                                                                                      return state;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                      export function clearLicense() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        localStorage.removeItem(LICENSE_KEY);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        export function canUseApp(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          state: LicenseState
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                state.activated ||
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    !state.trialExpired
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
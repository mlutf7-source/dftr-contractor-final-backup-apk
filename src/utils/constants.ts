import type {
    ExchangeRates,
      ProjectStatus,
        CurrencyCode,
        } from '../models/types';

        export const APP_NAME = 'دفتر المقاول';

        export const STORAGE = {
          PROJECTS: 'dftr-projects',
            TRASH: 'dftr-trash',
              THEME: 'dftr-theme',
                APP_PROFILE: 'dftr-app-profile',
                } as const;

                export const DEFAULT_RATES: ExchangeRates = {
                  SAR: 140,
                    USD: 530,
                    };

                    export const CURRENCIES: {
                      code: CurrencyCode;
                        name: string;
                        }[] = [
                          { code: 'YER', name: 'ريال يمني' },
                            { code: 'SAR', name: 'ريال سعودي' },
                              { code: 'USD', name: 'دولار أمريكي' },
                              ];

                              export const PROJECT_STATUS: {
                                value: ProjectStatus;
                                  label: string;
                                  }[] = [
                                    { value: 'active', label: 'جاري التنفيذ' },
                                      { value: 'paused', label: 'متوقف' },
                                        { value: 'completed', label: 'منجز' },
                                          { value: 'archived', label: 'مؤرشف' },
                                          ];

                                          export const DOCUMENT_TYPES = [
                                            'عقد',
                                              'مخطط',
                                                'رخصة',
                                                  'فاتورة',
                                                    'سند قبض',
                                                      'سند صرف',
                                                        'صورة',
                                                          'PDF',
                                                            'Excel',
                                                              'أخرى',
                                                              ];

                                                              export const SUGGESTION_KEYS = {
                                                                units: 'dftr-suggestions-units',
                                                                  itemNames: 'dftr-suggestions-item-names',
                                                                    materialNames: 'dftr-suggestions-material-names',
                                                                      subcontractorNames: 'dftr-suggestions-subcontractor-names',
                                                                        supplierNames: 'dftr-suggestions-supplier-names',
                                                                          expenseTypes: 'dftr-suggestions-expense-types',
                                                                            otherCostNames: 'dftr-suggestions-other-cost-names',
                                                                              trades: 'dftr-suggestions-trades',
                                                                                documentTitles: 'dftr-suggestions-document-titles',
                                                                                };

                                                                                export const PRIMARY_COLOR = '#245BFF';

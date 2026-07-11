export type CurrencyCode = 'YER' | 'SAR' | 'USD';

export type ExchangeRates = {
  SAR: number;
    USD: number;
    };

    export type AppProfile = {
      officeName: string;
        contractorName: string;
          phone1: string;
            phone2: string;
              location: string;
                logo: string;
                };

                export type ProjectStatus =
                  | 'active'
                    | 'paused'
                      | 'completed'
                        | 'archived';

                        export type TransactionType =
                          | 'owner_item'
                            | 'owner_material'
                              | 'owner_other_cost'
                                | 'owner_payment'
                                  | 'contractor_expense'
                                    | 'subcontractor_due'
                                      | 'subcontractor_payment';

                                      export type TransactionDirection =
                                        | 'income'
                                          | 'expense';

                                          export type Transaction = {
                                            id: string;
                                              projectId: string;
                                                type: TransactionType;
                                                  direction: TransactionDirection;

                                                    title: string;

                                                      quantity?: number;
                                                        unit?: string;

                                                          unitPrice?: number;
                                                            unitPriceCurrency?: CurrencyCode;

                                                              amountYER: number;
                                                                originalAmount: number;
                                                                  currency: CurrencyCode;
                                                                    exchangeRate: number;

                                                                      relatedId?: string;

                                                                        date: string;
                                                                          notes?: string;

                                                                            createdAt: string;
                                                                              updatedAt: string;
                                                                              };

                                                                              export type Subcontractor = {
                                                                                id: string;
                                                                                  name: string;
                                                                                    trade: string;
                                                                                      phone: string;
                                                                                        notes: string;

                                                                                          agreementAmountYER: number;
                                                                                            originalAgreementAmount: number;
                                                                                              currency: CurrencyCode;
                                                                                                exchangeRate: number;

                                                                                                  createdAt: string;
                                                                                                    updatedAt: string;
                                                                                                    };

                                                                                                    export type DocumentFile = {
                                                                                                      id: string;
                                                                                                        projectId: string;
                                                                                                          title: string;
                                                                                                            type: string;
                                                                                                              fileName: string;
                                                                                                                fileType: string;
                                                                                                                  dataUrl: string;
                                                                                                                    date: string;
                                                                                                                      notes?: string;
                                                                                                                        createdAt: string;
                                                                                                                        };

                                                                                                                        export type Project = {
                                                                                                                          id: string;
                                                                                                                            code: string;

                                                                                                                              name: string;
                                                                                                                                ownerName: string;
                                                                                                                                  ownerPhone: string;

                                                                                                                                    location: string;
                                                                                                                                      area: string;
                                                                                                                                        startDate: string;
                                                                                                                                          notes: string;

                                                                                                                                            status: ProjectStatus;

                                                                                                                                              exchangeRates: ExchangeRates;

                                                                                                                                                transactions: Transaction[];
                                                                                                                                                  subcontractors: Subcontractor[];
                                                                                                                                                    documents: DocumentFile[];

                                                                                                                                                      createdAt: string;
                                                                                                                                                        updatedAt: string;
                                                                                                                                                        };

                                                                                                                                                        export type SummaryResult = {
                                                                                                                                                          due: number;
                                                                                                                                                            paid: number;
                                                                                                                                                              balance: number;
                                                                                                                                                                status: string;
                                                                                                                                                                  color: 'blue' | 'red';
                                                                                                                                                                    displayBalance: number;
                                                                                                                                                                    };

                                                                                                                                                                    export type CashSummaryResult = {
                                                                                                                                                                      income: number;
                                                                                                                                                                        expense: number;
                                                                                                                                                                          balance: number;
                                                                                                                                                                            status: string;
                                                                                                                                                                              color: 'blue' | 'red';
                                                                                                                                                                                displayBalance: number;
                                                                                                                                                                                };
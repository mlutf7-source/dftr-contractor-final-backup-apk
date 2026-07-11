export const n = (value: number | string = 0) =>
  Number(value || 0);

  export const round = (
    value: number,
      digits = 2
      ) =>
        Number(value.toFixed(digits));

        export const comma = (
          value: number | string = 0
          ) =>
            n(value).toLocaleString('en-US');

            export const today = () =>
              new Date().toISOString().slice(0, 10);

              export const now = () =>
                new Date().toISOString();

                export const uid = () =>
                  Date.now().toString(36) +
                    Math.random().toString(36).slice(2, 8);

                    export const projectCode = (count: number) =>
                      `PRJ-${String(count + 1).padStart(4, '0')}`;

                      export const text = (value?: string) =>
                        (value || '').trim();

                        export const isEmpty = (value?: string) =>
                          text(value) === '';

                          export const sum = (list: number[]) =>
                            list.reduce((a, b) => a + b, 0);
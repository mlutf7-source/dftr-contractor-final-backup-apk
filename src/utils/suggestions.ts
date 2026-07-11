import { SUGGESTION_KEYS } from './constants';

const key = (type: string) =>
  SUGGESTION_KEYS[type as keyof typeof SUGGESTION_KEYS] ||
    `dftr-suggestions-${type}`;

    export function loadSuggestions(type: string): string[] {
      try {
          return JSON.parse(localStorage.getItem(key(type)) || '[]');
            } catch {
                return [];
                  }
                  }

                  export function saveSuggestion(
                    type: string,
                      value: string
                      ) {
                        const text = value.trim();

                          if (!text) return;

                            const list = loadSuggestions(type);

                              if (!list.includes(text))
                                  list.unshift(text);

                                    localStorage.setItem(
                                        key(type),
                                            JSON.stringify(list.slice(0, 100))
                                              );
                                              }

                                              export function removeSuggestion(
                                                type: string,
                                                  value: string
                                                  ) {
                                                    localStorage.setItem(
                                                        key(type),
                                                            JSON.stringify(
                                                                  loadSuggestions(type).filter(
                                                                          x => x !== value
                                                                                )
                                                                                    )
                                                                                      );
                                                                                      }

                                                                                      export function clearSuggestions(
                                                                                        type: string
                                                                                        ) {
                                                                                          localStorage.removeItem(key(type));
                                                                                          }

                                                                                          export function clearAllSuggestions() {
                                                                                            Object.values(SUGGESTION_KEYS).forEach(k =>
                                                                                                localStorage.removeItem(k)
                                                                                                  );
                                                                                                  }
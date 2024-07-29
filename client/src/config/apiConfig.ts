const base = import.meta.env.VITE_API_BASE_URL ?? '';

export const setApiUrl = (endpoint: string) => {
  return base + `/${endpoint}`;
};

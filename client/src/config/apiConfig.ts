const base = import.meta.env.VITE_API_BASE_URL ?? 'api/v1';

export const setApiUrl = (endpoint: string) => {
  return base + `/${endpoint}`;
};

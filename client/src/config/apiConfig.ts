const base = import.meta.env.VITE_API_BASE_URL ?? 'api/v1';

console.log('BASE: ', base);

export const setApiUrl = (endpoint: string) => {
  return base + `/${endpoint}`;
};

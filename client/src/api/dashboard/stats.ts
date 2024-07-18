import { IStats } from '../../types/dashboard';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/dashboard`;

export const readStatsRequest = async (): Promise<IStats> => {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) throw new Error('Error while calculating stats');
  const { data } = await res.json();

  return data;
};

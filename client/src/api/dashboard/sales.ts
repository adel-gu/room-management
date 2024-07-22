import { ISales } from '../../types/dashboard';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/sales`;

export const readSalesRequest = async (): Promise<ISales[]> => {
  const res = await fetch(API_BASE_URL, { credentials: 'include' });

  if (!res.ok) throw new Error('Error while calculating sales');
  const { data } = await res.json();

  return data;
};

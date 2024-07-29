import { setApiUrl } from '../../config/apiConfig';
import { ISales } from '../../types/dashboard';

const API_BASE_URL = setApiUrl('sales');

export const readSalesRequest = async (query: string): Promise<ISales[]> => {
  const res = await fetch(`${API_BASE_URL}?last=${query}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error while calculating sales');
  const { data } = await res.json();

  return data;
};

import { setApiUrl } from '../../config/apiConfig';
import { IStaysNights } from '../../types/dashboard';

const API_BASE_URL = setApiUrl('stays-nights');

export const readStaysNightsRequest = async (
  query: string,
): Promise<IStaysNights[]> => {
  const res = await fetch(`${API_BASE_URL}?last=${query}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error("Error while calculating nights stay's");
  const { data } = await res.json();

  return data;
};

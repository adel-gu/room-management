import { GetAllGuestsResType, IGuest } from '../../types/guest';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/guests`;

export const readAllGuestsRequest = async (
  query: string,
): Promise<GetAllGuestsResType> => {
  const res = await fetch(`${API_BASE_URL}`);
  if (!res.ok) throw new Error('Error Fetching guests!');
  const { data } = await res.json();

  return data;
};

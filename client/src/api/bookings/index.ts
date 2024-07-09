import { GetAllBookingsResType } from '../../types/bookings';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/bookings`;

export const readAllBookingsRequest = async (
  query: string,
): Promise<GetAllBookingsResType> => {
  const res = await fetch(`${API_BASE_URL}${query}`);
  if (!res.ok) throw new Error('Error Fetching bookings!');
  const { data } = await res.json();

  return data;
};

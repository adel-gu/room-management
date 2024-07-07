import { GetAllGuestsResType, GuestFormData, IGuest } from '../../types/guest';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/guests`;

export const readAllGuestsRequest = async (
  query: string,
): Promise<GetAllGuestsResType> => {
  const res = await fetch(`${API_BASE_URL}`);
  if (!res.ok) throw new Error('Error Fetching guests!');
  const { data } = await res.json();

  return data;
};

export const createNewGuestRequest = async (
  guest: GuestFormData,
): Promise<IGuest> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(guest),
  });

  if (!res.ok) throw new Error('Failed to create new guest');

  const { data } = await res.json();
  return data;
};

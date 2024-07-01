import { Room } from '../../types/room';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/rooms`;

export const readAllRoomsRequest = async (): Promise<Room[]> => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Error Fetching rooms!');
  const { data } = await res.json();

  return data;
};

export const createNewRoomRequest = async (room: FormData) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    body: room,
  });

  if (!res.ok) throw new Error('Failed to create new room');

  const { data } = await res.json();
  return data;
};

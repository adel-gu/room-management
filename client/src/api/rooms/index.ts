import { EditReqType, GetAllRoomsResType } from '../../types/room';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/rooms`;

export const readAllRoomsRequest = async (
  query: string,
): Promise<GetAllRoomsResType> => {
  const res = await fetch(`${API_BASE_URL}${query}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error Fetching rooms!');
  const { data } = await res.json();

  return data;
};

export const createNewRoomRequest = async (room: FormData) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    credentials: 'include',
    body: room,
  });

  if (!res.ok) throw new Error('Failed to create new room');

  const { data } = await res.json();
  return data;
};

export const deleteRoomRequest = async (roomId: string) => {
  const res = await fetch(`${API_BASE_URL}/${roomId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to delete room');

  const { data } = await res.json();
  return data;
};

export const editRoomRequest = async ({ roomId, editedData }: EditReqType) => {
  const res = await fetch(`${API_BASE_URL}/${roomId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: editedData,
  });

  if (!res.ok) throw new Error('Failed to update room');

  const { data } = await res.json();

  return data;
};

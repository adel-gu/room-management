import { IAdmin } from '../../types/Admin';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const getCurrentAdminRequest = async (): Promise<IAdmin> => {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error Fetching current admin profile!');

  const { data } = await res.json();

  return data;
};

import { setApiUrl } from '../../config/apiConfig';
import { IAdmin } from '../../types/Admin';

export const getCurrentAdminRequest = async (): Promise<IAdmin> => {
  const res = await fetch(setApiUrl('profile'), {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error Fetching current admin profile!');

  const { data } = await res.json();

  return data;
};

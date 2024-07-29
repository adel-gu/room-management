import { setApiUrl } from '../../config/apiConfig';
import { LoginData } from '../../types/Admin';

export const loginRequest = async (data: LoginData) => {
  const res = await fetch(setApiUrl('login'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error while login');

  return await res.json();
};

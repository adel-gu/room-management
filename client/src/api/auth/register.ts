import { setApiUrl } from '../../config/apiConfig';
import { registerData } from '../../types/Admin';

export const registerRequest = async (data: registerData) => {
  const res = await fetch(setApiUrl('signup'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error while registration');

  return await res.json();
};

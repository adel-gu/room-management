import { setApiUrl } from '../../config/apiConfig';

export const validateAuthRequest = async (): Promise<boolean> => {
  const res = await fetch(setApiUrl('validate-auth'), {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error while login');

  const {
    data: { isAuthenticated },
  } = await res.json();

  return isAuthenticated;
};

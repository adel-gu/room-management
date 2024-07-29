import { setApiUrl } from '../../config/apiConfig';

export const logoutRequest = async () => {
  const res = await fetch(setApiUrl('logout'), {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error while logout');
};

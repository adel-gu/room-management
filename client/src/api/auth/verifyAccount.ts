import { setApiUrl } from '../../config/apiConfig';
import { verificationData } from '../../types/Admin';

export const verifyAccountRequest = async (data: verificationData) => {
  const res = await fetch(setApiUrl('verify'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error while verifying account');

  return await res.json();
};

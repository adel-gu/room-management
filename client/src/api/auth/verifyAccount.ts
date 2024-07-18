import { verificationData } from '../../types/Admin';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/verify`;

export const verifyAccountRequest = async (data: verificationData) => {
  const res = await fetch(API_BASE_URL, {
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
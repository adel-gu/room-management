import { registerData } from '../../types/Admin';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/signup`;

export const registerRequest = async (data: registerData) => {
  const res = await fetch(API_BASE_URL, {
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

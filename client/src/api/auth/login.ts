import { LoginData } from '../../types/Admin';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/login`;

// Login

export const loginRequest = async (data: LoginData) => {
  console.log('DATA: ', data);
  const res = await fetch(API_BASE_URL, {
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

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/validate-auth`;

export const validateAuthRequest = async (): Promise<boolean> => {
  const res = await fetch(API_BASE_URL, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error while login');

  const {
    data: { isAuthenticated },
  } = await res.json();

  return isAuthenticated;
};

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/logout`;

export const logoutRequest = async () => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error while logout');
};

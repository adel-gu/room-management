import { ITodayActivity } from '../../types/dashboard';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/today-activities`;

export const readTodayActivitiesRequest = async (
  query: string,
): Promise<ITodayActivity[]> => {
  const res = await fetch(`${API_BASE_URL}?last=${query}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error("Error while calculating today's activities");
  const {
    data: { guests },
  } = await res.json();

  return guests;
};

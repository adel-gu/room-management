import { ITodayActivity } from '../../types/dashboard';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/today-activities`;

export const readTodayActivitiesRequest = async (): Promise<
  ITodayActivity[]
> => {
  const res = await fetch(API_BASE_URL, { credentials: 'include' });

  if (!res.ok) throw new Error('Error while calculating stats');
  const {
    data: { guests },
  } = await res.json();

  return guests;
};

import { useQuery } from '@tanstack/react-query';
import {
  readStatsRequest,
  readTodayActivitiesRequest,
} from '../../api/dashboard';

export const useReadStats = () => {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['readStats'],
    queryFn: () => readStatsRequest(),
  });

  return { stats, isStatsLoading };
};

export const useReadTodayActivities = () => {
  const { data: activities, isLoading: isActivitiesLoading } = useQuery({
    queryKey: ['readTodayActivities'],
    queryFn: () => readTodayActivitiesRequest(),
  });

  return { activities, isActivitiesLoading };
};

import { useQuery } from '@tanstack/react-query';
import {
  readStatsRequest,
  readStaysNightsRequest,
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

export const useReadStaysNights = () => {
  const { data: staysNights, isLoading: isStaysNightsLoading } = useQuery({
    queryKey: ['readStaysNights'],
    queryFn: () => readStaysNightsRequest(),
  });

  return { staysNights, isStaysNightsLoading };
};

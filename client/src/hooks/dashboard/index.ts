import { useQuery } from '@tanstack/react-query';
import {
  readStatsRequest,
  readStaysNightsRequest,
  readTodayActivitiesRequest,
  readSalesRequest,
} from '../../api/dashboard';
import { useSearchParams } from 'react-router-dom';

export const useReadStats = () => {
  const [searchParams] = useSearchParams();
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['readStats'],
    queryFn: () => readStatsRequest(searchParams.get('last') ?? '7'),
  });

  return { stats, isStatsLoading };
};

export const useReadTodayActivities = () => {
  const [searchParams] = useSearchParams();
  const { data: activities, isLoading: isActivitiesLoading } = useQuery({
    queryKey: ['readTodayActivities'],
    queryFn: () => readTodayActivitiesRequest(searchParams.get('last') ?? '7'),
  });

  return { activities, isActivitiesLoading };
};

export const useReadStaysNights = () => {
  const [searchParams] = useSearchParams();
  const { data: staysNights, isLoading: isStaysNightsLoading } = useQuery({
    queryKey: ['readStaysNights'],
    queryFn: () => readStaysNightsRequest(searchParams.get('last') ?? '7'),
  });

  return { staysNights, isStaysNightsLoading };
};

export const useReadSales = () => {
  const [searchParams] = useSearchParams();
  const { data: sales, isLoading: isSalesLoading } = useQuery({
    queryKey: ['readSales'],
    queryFn: () => readSalesRequest(searchParams.get('last') ?? '7'),
  });

  return { sales, isSalesLoading };
};

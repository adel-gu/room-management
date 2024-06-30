import { useQuery } from '@tanstack/react-query';
import { readAllRooms } from '../../api/room';
import toast from 'react-hot-toast';

export const useReadAllRooms = () => {
  const {
    data: rooms,
    isLoading: isRoomsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllRooms'],
    queryFn: readAllRooms,
  });

  if (error) toast.error(error.message);

  return {
    rooms,
    isRoomsLoading,
  };
};

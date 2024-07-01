import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewRoomRequest, readAllRoomsRequest } from '../../api/room';
import toast from 'react-hot-toast';

export const useReadAllRooms = () => {
  const {
    data: rooms,
    isLoading: isRoomsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllRooms'],
    queryFn: readAllRoomsRequest,
  });

  if (error) toast.error(error.message);

  return {
    rooms,
    isRoomsLoading,
  };
};

export const useCreateNewRoom = () => {
  const queryClient = useQueryClient();
  const { mutate: createNewRoom, isPending: isCreatingRoomPending } =
    useMutation({
      mutationKey: ['createRoom'],
      mutationFn: createNewRoomRequest,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['readAllRooms'] });
        toast.success('Room created successfully');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createNewRoom, isCreatingRoomPending };
};

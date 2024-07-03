import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewRoomRequest,
  deleteRoomRequest,
  editRoomRequest,
  readAllRoomsRequest,
} from '../../api/room';
import toast from 'react-hot-toast';

export const useReadAllRooms = (query: string) => {
  const {
    data,
    isLoading: isRoomsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllRooms', query],
    queryFn: () => readAllRoomsRequest(query),
  });

  if (error) toast.error(error.message);

  return {
    data,
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

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteRoom, isPending: isDeletingRoomPending } = useMutation({
    mutationKey: ['deleteRoom'],
    mutationFn: deleteRoomRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['readAllRooms'] });
      toast.success('Room deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteRoom, isDeletingRoomPending };
};

export const useEditRoom = () => {
  const queryClient = useQueryClient();
  const { mutate: editRoom, isPending: isEditingRoomPending } = useMutation({
    mutationKey: ['editRoom'],
    mutationFn: editRoomRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['readAllRooms'] });
      toast.success('Room updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editRoom, isEditingRoomPending };
};

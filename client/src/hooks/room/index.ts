import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewRoomRequest,
  deleteRoomRequest,
  editRoomRequest,
  readAllRoomsRequest,
} from '../../api/room';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { defineRoomFilterQuery } from '../../utils/defineFilters';

export const useReadAllRooms = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const query = defineRoomFilterQuery(
    'discount',
    searchParams.get('discount'),
    searchParams.get('page'),
    searchParams.get('sort'),
  );

  const {
    data: { data: rooms, page, pages, total } = {},
    isLoading: isRoomsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllRooms', query],
    queryFn: () => readAllRoomsRequest(query),
  });

  if (error) toast.error(error.message);

  // pre-fetching
  if (!!(page && pages) && page < pages) {
    const newQuery = defineRoomFilterQuery(
      'discount',
      searchParams.get('discount'),
      `${page + 1}`,
      searchParams.get('sort'),
    );
    queryClient.prefetchQuery({
      queryKey: ['readAllRooms'],
      queryFn: () => readAllRoomsRequest(newQuery),
    });
  }

  if (!!(page && pages) && page > 1) {
    const newQuery = defineRoomFilterQuery(
      'discount',
      searchParams.get('discount'),
      `${page - 1}`,
      searchParams.get('sort'),
    );
    queryClient.prefetchQuery({
      queryKey: ['readAllRooms'],
      queryFn: () => readAllRoomsRequest(newQuery),
    });
  }

  return {
    rooms,
    page,
    pages,
    total,
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

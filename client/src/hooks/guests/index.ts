import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  createNewGuestRequest,
  deleteGuestRequest,
  editGuestRequest,
  readAllGuestsRequest,
} from '../../api/guests';
import toast from 'react-hot-toast';
import { defineGuestSearchQuery } from '../../utils/defineFilters';

export const useReadAllGuests = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const query = defineGuestSearchQuery(
    searchParams.get('search'),
    searchParams.get('page'),
    searchParams.get('guest') ?? undefined,
  );

  const {
    data: { data: guests, page, pages, total } = {},
    isLoading: isGuestsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllGuests', query],
    queryFn: () => readAllGuestsRequest(query),
  });

  if (error) toast.error(error.message);

  // pre-fetching
  if (!!(page && pages) && page < pages) {
    const newQuery = defineGuestSearchQuery(
      searchParams.get('search'),
      `${page + 1}`,
    );
    queryClient.prefetchQuery({
      queryKey: ['readAllGuests', newQuery],
      queryFn: () => readAllGuestsRequest(newQuery),
    });
  }

  if (!!(page && pages) && page > 1) {
    const newQuery = defineGuestSearchQuery(
      searchParams.get('search'),
      `${page - 1}`,
    );
    queryClient.prefetchQuery({
      queryKey: ['readAllGuests', newQuery],
      queryFn: () => readAllGuestsRequest(newQuery),
    });
  }

  return {
    guests,
    page,
    pages,
    total,
    isGuestsLoading,
  };
};

export const useCreateNewGuest = () => {
  const queryClient = useQueryClient();
  const { mutate: createNewGuest, isPending: isCreatingGuestPending } =
    useMutation({
      mutationKey: ['createRoom'],
      mutationFn: createNewGuestRequest,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['readAllGuests'] });
        toast.success('Guest created successfully');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createNewGuest, isCreatingGuestPending };
};

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteGuest, isPending: isDeletingGuestPending } =
    useMutation({
      mutationKey: ['deleteGuest'],
      mutationFn: deleteGuestRequest,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['readAllGuests'] });
        toast.success('Guest deleted successfully');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { deleteGuest, isDeletingGuestPending };
};

export const useEditGuest = () => {
  const queryClient = useQueryClient();
  const { mutate: editGuest, isPending: isEditingGuestPending } = useMutation({
    mutationKey: ['editGuest'],
    mutationFn: editGuestRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['readAllGuests'] });
      toast.success('Guest updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editGuest, isEditingGuestPending };
};

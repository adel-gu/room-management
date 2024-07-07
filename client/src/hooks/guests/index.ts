import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { createNewGuestRequest, readAllGuestsRequest } from '../../api/guests';
import toast from 'react-hot-toast';

export const useReadAllGuests = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // const query = defineRoomFilterQuery(
  //   'discount',
  //   searchParams.get('discount'),
  //   searchParams.get('page'),
  //   searchParams.get('sort'),
  // );

  const {
    data: { data: guests, page, pages, total } = {},
    isLoading: isGuestsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllGuests'],
    queryFn: () => readAllGuestsRequest(''),
  });

  if (error) toast.error(error.message);

  // pre-fetching
  // if (!!(page && pages) && page < pages) {
  //   const newQuery = defineRoomFilterQuery(
  //     'discount',
  //     searchParams.get('discount'),
  //     `${page + 1}`,
  //     searchParams.get('sort'),
  //   );
  //   queryClient.prefetchQuery({
  //     queryKey: ['readAllRooms'],
  //     queryFn: () => readAllRoomsRequest(newQuery),
  //   });
  // }

  // if (!!(page && pages) && page > 1) {
  //   const newQuery = defineRoomFilterQuery(
  //     'discount',
  //     searchParams.get('discount'),
  //     `${page - 1}`,
  //     searchParams.get('sort'),
  //   );
  //   queryClient.prefetchQuery({
  //     queryKey: ['readAllRooms'],
  //     queryFn: () => readAllRoomsRequest(newQuery),
  //   });
  // }

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

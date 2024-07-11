import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createNewBookingRequest,
  readAllBookingsRequest,
  readBookingDetailsRequest,
} from '../../api/bookings';
import { useParams } from 'react-router-dom';

export const useReadAllBookings = () => {
  // const [searchParams] = useSearchParams();
  // const queryClient = useQueryClient();

  // const query = defineRoomFilterQuery(
  //   'discount',
  //   searchParams.get('discount'),
  //   searchParams.get('page'),
  //   searchParams.get('sort'),
  // );

  const {
    data: { data: bookings, page, pages, total } = {},
    isLoading: isBookingsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllBookings'],
    queryFn: () => readAllBookingsRequest(''),
  });

  if (error) toast.error(error.message);

  // // pre-fetching
  // if (!!(page && pages) && page < pages) {
  //   const newQuery = defineRoomFilterQuery(
  //     'discount',
  //     searchParams.get('discount'),
  //     `${page + 1}`,
  //     searchParams.get('sort'),
  //   );
  //   queryClient.prefetchQuery({
  //     queryKey: ['readAllRooms', newQuery],
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
  //     queryKey: ['readAllRooms', newQuery],
  //     queryFn: () => readAllRoomsRequest(newQuery),
  //   });
  // }

  return {
    bookings,
    page,
    pages,
    total,
    isBookingsLoading,
  };
};

export const useReadBookingDetails = () => {
  const { bookingId } = useParams();
  const {
    data: bookingDetails,
    isLoading: isBookingDetailsLoading,
    error,
  } = useQuery({
    queryKey: ['readBookingDetails'],
    queryFn: () => readBookingDetailsRequest(bookingId ?? ''),
  });

  if (error) toast.error(error.message);

  return {
    bookingDetails,

    isBookingDetailsLoading,
  };
};

export const useCreateNewBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: createNewBooking, isPending: isCreatingBookingPending } =
    useMutation({
      mutationKey: ['createBooking'],
      mutationFn: createNewBookingRequest,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['readAllBookings'] });
        toast.success('Booking created successfully');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createNewBooking, isCreatingBookingPending };
};

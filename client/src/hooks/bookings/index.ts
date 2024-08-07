import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createNewBookingRequest,
  editBookingRequest,
  readAllBookingsRequest,
  readBookingDetailsRequest,
} from '../../api/bookings';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { defineRoomFilterQuery } from '../../utils/defineFilters';

export const useReadAllBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const query = defineRoomFilterQuery(
    'status',
    searchParams.get('status'),
    searchParams.get('page'),
    searchParams.get('sort'),
  );

  const {
    data: { data: bookings, page, pages, total } = {},
    isLoading: isBookingsLoading,
    error,
  } = useQuery({
    queryKey: ['readAllBookings', query],
    queryFn: () => readAllBookingsRequest(query),
  });

  if (error) toast.error(error.message);

  // pre-fetching
  if (!!(page && pages) && page < pages) {
    const newQuery = defineRoomFilterQuery(
      'status',
      searchParams.get('status'),
      `${page + 1}`,
      searchParams.get('sort'),
    );
    queryClient.prefetchQuery({
      queryKey: ['readAllBookings', newQuery],
      queryFn: () => readAllBookingsRequest(newQuery),
    });
  }

  if (!!(page && pages) && page > 1) {
    const newQuery = defineRoomFilterQuery(
      'status',
      searchParams.get('status'),
      `${page - 1}`,
      searchParams.get('sort'),
    );
    queryClient.prefetchQuery({
      queryKey: ['readAllBookings', newQuery],
      queryFn: () => readAllBookingsRequest(newQuery),
    });
  }

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

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: editBookingRequest,

    onSuccess: async (data) => {
      toast.success(`Booking #${data._id} successfully checked in`);
      await queryClient.invalidateQueries({ queryKey: ['readBookingDetails'] });
      navigate('/');
    },

    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isCheckingIn };
}

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: editBookingRequest,

    onSuccess: async (data) => {
      toast.success(`Booking #${data._id} successfully checked out`);
      await queryClient.invalidateQueries({
        queryKey: ['readBookingDetails', 'readTodayActivities'],
      });
    },

    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isCheckingOut };
}

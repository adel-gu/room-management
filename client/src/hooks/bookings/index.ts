import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { readAllBookingsRequest } from '../../api/bookings';

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
    queryKey: ['readAllRooms'],
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

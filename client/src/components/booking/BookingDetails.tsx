import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../ui/Heading';
import Wrapper from '../ui/Wrapper';
import Badge from '../ui/Badge';

import ButtonText from '../ui/ButtonText';
import { useReadBookingDetails } from '../../hooks/bookings';
import Spinner from '../Spinner';
import BookingCard from './BookingCard';

const BookingDetails = () => {
  const { bookingDetails, isBookingDetailsLoading } = useReadBookingDetails();

  if (isBookingDetailsLoading) return <Spinner />;
  if (!bookingDetails) return <Spinner />;

  return (
    <>
      <Wrapper direction="hr">
        <Wrapper direction="hr">
          <Heading as="h1">Booking #{bookingDetails?._id}</Heading>
          <Badge status={bookingDetails?.status}>
            {bookingDetails?.status}
          </Badge>
        </Wrapper>
        <ButtonText>&larr; Back</ButtonText>
      </Wrapper>

      <BookingCard booking={bookingDetails} />
    </>
  );
};
export default BookingDetails;

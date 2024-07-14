import { useNavigate } from 'react-router-dom';
import Heading from '../ui/Heading';
import Wrapper from '../ui/Wrapper';
import Badge from '../ui/Badge';

import ButtonText from '../ui/ButtonText';
import { useReadBookingDetails } from '../../hooks/bookings';
import Spinner from '../Spinner';
import BookingCard from './BookingCard';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';
import { BookingStatus } from '../../utils/constants';
import Empty from '../Empty';

const BookingDetails = () => {
  const navigate = useNavigate();
  const { bookingDetails, isBookingDetailsLoading } = useReadBookingDetails();

  if (isBookingDetailsLoading) return <Spinner />;
  if (!bookingDetails) return <Empty resourceName="booking" />;

  return (
    <>
      <Wrapper direction="hr">
        <Wrapper direction="hr">
          <Heading as="h1">Booking #{bookingDetails?._id}</Heading>
          <Badge status={bookingDetails?.status}>
            {bookingDetails?.status}
          </Badge>
        </Wrapper>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Wrapper>

      <BookingCard booking={bookingDetails} />

      <ButtonGroup>
        {bookingDetails.status === BookingStatus.Pending && (
          <Button onClick={() => navigate(`/checkin/${bookingDetails._id}`)}>
            Check in
          </Button>
        )}
      </ButtonGroup>
    </>
  );
};
export default BookingDetails;

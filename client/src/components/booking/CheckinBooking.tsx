import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCheckin, useReadBookingDetails } from '../../hooks/bookings';
import { BookingStatus } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';

import Spinner from '../Spinner';
import ButtonText from '../ui/ButtonText';
import Heading from '../ui/Heading';
import Wrapper from '../ui/Wrapper';
import BookingCard from './BookingCard';
import CheckBox from '../CheckBox';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const navigate = useNavigate();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { bookingDetails, isBookingDetailsLoading } = useReadBookingDetails();
  const { checkin, isCheckingIn } = useCheckin();

  const optionalBreakfastPrice =
    10 * (bookingDetails?.numNights ?? 1) * (bookingDetails?.numGuests ?? 1);

  if (isBookingDetailsLoading) return <Spinner />;
  if (!bookingDetails) return <Spinner />;
  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId: bookingDetails._id,
        editedData: {
          status: BookingStatus.CheckedIn,
          hasBreakfast: true,
          isPaid: confirmPaid,
          extraPrice: optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId: bookingDetails._id,
        editedData: { status: BookingStatus.CheckedIn, isPaid: confirmPaid },
      });
    }
  };

  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Booking #{bookingDetails?._id}</Heading>

        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Wrapper>

      <BookingCard booking={bookingDetails} />

      {!bookingDetails.hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            <span>
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
              ?
            </span>
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          <span>
            I confirm that {bookingDetails.guest?.fullName} has paid the total
            amount of{' '}
            {!addBreakfast
              ? formatCurrency(bookingDetails.totalPrice ?? 0)
              : `${formatCurrency(
                  (bookingDetails.totalPrice ?? 0) + optionalBreakfastPrice,
                )} (${formatCurrency(
                  bookingDetails.totalPrice ?? 0,
                )} + ${formatCurrency(optionalBreakfastPrice)})`}
          </span>
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingDetails._id}
        </Button>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
export default CheckinBooking;

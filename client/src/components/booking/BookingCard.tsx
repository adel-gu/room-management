import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import {
  CircleCheck,
  CircleDollarSign,
  HomeIcon,
  MessageSquareText,
} from 'lucide-react';

import { IBooking } from '../../types/bookings';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { countries } from '../../utils/countries';
import DataItem from '../DataItem';

interface Props {
  booking: IBooking;
}

const Card = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const CardHeader = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const CardBody = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div<{ isPaid?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const CardFooter = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const BookingCard = ({ booking }: Props) => {
  const country = countries.find(
    (ct) => ct.label === booking.guest.nationality,
  );
  return (
    <Card>
      <CardHeader>
        <div>
          <HomeIcon />
          <p>
            {booking.numNights} nights in Room <span>{booking.room.name}</span>
          </p>
        </div>

        <p>
          {format(new Date(booking.startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(booking.startDate))
            ? 'Today'
            : formatDistanceFromNow(booking.startDate)}
          ) &mdash; {format(new Date(booking.endDate), 'EEE, MMM dd yyyy')}
        </p>
      </CardHeader>
      <CardBody>
        <Guest>
          <span>
            {country ? `${country?.icon}` : booking.guest.nationality}
          </span>
          <p>
            {booking.guest.fullName}{' '}
            {booking.numGuests > 1 ? `+ ${booking.numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{booking.guest.email}</p>
          <span>&bull;</span>
          <p>National ID: {booking.guest.nationalID}</p>
        </Guest>

        {booking.observations && (
          <DataItem icon={<MessageSquareText />} label="Observations">
            <span>{booking.observations}</span>
          </DataItem>
        )}

        <DataItem icon={<CircleCheck />} label="Breakfast included?">
          <span>{booking.hasBreakfast ? 'Yes' : 'No'}</span>
        </DataItem>

        <Price isPaid={booking.isPaid}>
          <DataItem icon={<CircleDollarSign />} label={`Total price`}>
            <span>
              {formatCurrency(booking.totalPrice ?? 0)}

              {booking.hasBreakfast &&
                ` (${formatCurrency(
                  booking.roomPrice ?? 0,
                )} room + ${formatCurrency(
                  booking.extraPrice ?? 0,
                )} breakfast)`}
            </span>
          </DataItem>

          <p>{booking.isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </CardBody>

      <CardFooter>
        <p>
          Booked {format(new Date(booking.createdAt), 'EEE, MMM dd yyyy, p')}
        </p>
      </CardFooter>
    </Card>
  );
};
export default BookingCard;

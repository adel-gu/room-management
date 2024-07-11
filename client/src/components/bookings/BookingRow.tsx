import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import { IBooking } from '../../types/bookings';
import Modal from '../Modal';
import DropdownMenu from '../DropdownMenu';
import { EllipsisVertical, Eye, Trash2 } from 'lucide-react';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom';

interface Props {
  booking: IBooking;
}

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

const BookingRow = ({ booking }: Props) => {
  return (
    <>
      <Room>{booking.room.name}</Room>

      <Stacked>
        <span>{booking.guest.fullName}</span>
        <span>{booking.guest.email ?? '--'}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.startDate))
            ? 'Today'
            : formatDistanceFromNow(booking.startDate)}{' '}
          &rarr; {booking.numNights} night stay
        </span>
        <span>
          {format(new Date(booking.startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(booking.endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <div>
        <Badge status={booking.status}>
          {booking.status.replace('-', ' ')}
        </Badge>
      </div>

      <Amount>{formatCurrency(booking.totalPrice ?? 0)}</Amount>
      <Modal>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <EllipsisVertical />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <Link to={`/bookings/${booking._id}`}>
                <DropdownMenu.Item icon={<Eye />} disabled={false}>
                  Details
                </DropdownMenu.Item>
              </Link>

              <Modal.Trigger name="delete">
                <DropdownMenu.Item icon={<Trash2 />} disabled={false}>
                  delete
                </DropdownMenu.Item>
              </Modal.Trigger>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <Modal.Content name="edit">
          <span>Form</span>
          {/* <GuestForm guest={guest} /> */}
        </Modal.Content>
        <Modal.Content name="delete">
          <span>Delete</span>
          {/* <DeleteAction
            resourceName="Guest"
            handleDeleteAction={() => deleteGuest(guest._id)}
            disabled={isDeletingGuestPending}
          /> */}
        </Modal.Content>
      </Modal>
    </>
  );
};
export default BookingRow;

import { useReadAllBookings } from '../../hooks/bookings';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import Table from '../Table';
import BookingRow from './BookingRow';

const BookingTable = () => {
  const { bookings, page, pages, total, isBookingsLoading } =
    useReadAllBookings();

  if (isBookingsLoading) return <Spinner />;
  return (
    <Table columns="repeat(2,1.5fr) 2.4fr repeat(3,1fr)">
      <Table.Header>
        <div>Room</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {bookings?.map((booking) => (
          <Table.Row key={booking._id}>
            <BookingRow booking={booking} />
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Pagination pages={pages} page={page} total={total} />
      </Table.Footer>
    </Table>
  );
};
export default BookingTable;

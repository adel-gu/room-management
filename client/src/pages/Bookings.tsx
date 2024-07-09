import Wrapper from '../components/ui/Wrapper';
import Heading from '../components/ui/Heading';
import BookingTable from '../components/bookings/BookingTable';
import AddBooking from '../components/bookings/AddBooking';

const Bookings = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Bookings</Heading>
        {/* <QueryOperations filterObj={filterObj} sortByObj={sortByObj} /> */}
      </Wrapper>
      <Wrapper>
        <BookingTable />
        <AddBooking />
      </Wrapper>
    </>
  );
};
export default Bookings;

import Wrapper from '../components/ui/Wrapper';
import Heading from '../components/ui/Heading';
import BookingTable from '../components/bookings/BookingTable';
import AddBooking from '../components/bookings/AddBooking';
import { BookingStatus } from '../utils/constants';
import { FilterObjType, SortByObjType } from '../types/filter';
import QueryOperations from '../components/QueryOperations';

const filterObj: FilterObjType = {
  field: 'status',
  options: [
    { value: 'all', label: 'All' },
    { value: `=${BookingStatus.CheckedOut}`, label: 'Checked out' },
    { value: `=${BookingStatus.CheckedIn}`, label: 'Checked in' },
    { value: `=${BookingStatus.Pending}`, label: 'Pending' },
  ],
};

const sortByObj: SortByObjType = [
  { value: '=startDate', label: 'Sort by date (recent first)' },
  { value: '=-startDate', label: 'Sort by date (earlier first)' },
  {
    value: '=totalPrice',
    label: 'Sort by amount (high first)',
  },
  { value: '=-totalPrice', label: 'Sort by amount (low first)' },
];

const Bookings = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Bookings</Heading>
        <QueryOperations filterObj={filterObj} sortByObj={sortByObj} />
      </Wrapper>
      <Wrapper>
        <BookingTable />
        <AddBooking />
      </Wrapper>
    </>
  );
};
export default Bookings;

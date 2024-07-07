import QueryOperations from '../components/QueryOperations';
import Heading from '../components/ui/Heading';
import Wrapper from '../components/ui/Wrapper';
import { FilterObjType, SortByObjType } from '../types/filter';
import GuestsTable from '../components/guests/GuestsTable';
import AddGuest from '../components/guests/AddGuest';

// const filterObj: FilterObjType = {
//   field: 'discount',
//   options: [
//     { value: 'all', label: 'All' },
//     { value: '=0', label: 'No discount' },
//     { value: '[gt]=0', label: 'With discount' },
//   ],
// };

// const sortByObj: SortByObjType = [
//   { value: '=name', label: 'Sort by name (A-Z)' },
//   { value: '=-name', label: 'Sort by name (Z-A)' },
//   { value: '=regularPrice', label: 'Sort by price (asc)' },
//   { value: '=-regularPrice', label: 'Sort by price (desc)' },
//   { value: '=maxCapacity', label: 'Sort by capacity (asc)' },
//   { value: '=-maxCapacity', label: 'Sort by capacity (desc)' },
// ];

const Guests = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Guests</Heading>
        {/* <QueryOperations filterObj={filterObj} sortByObj={sortByObj} /> */}
      </Wrapper>
      <Wrapper>
        <GuestsTable />
        <AddGuest />
      </Wrapper>
    </>
  );
};
export default Guests;

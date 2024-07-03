import AddRoom from '../components/AddRoom';
import QueryOperations from '../components/QueryOperations';
import RoomsTable from '../components/RoomsTable';
import Heading from '../components/ui/Heading';
import Wrapper from '../components/ui/Wrapper';
import { FilterObjType } from '../types/filter';

const filterObj: FilterObjType = {
  field: 'discount',
  options: [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No discount' },
    { value: 'with-discount', label: 'With discount' },
  ],
};

const Rooms = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Rooms</Heading>
        <QueryOperations filterObj={filterObj} />
      </Wrapper>
      <Wrapper>
        <RoomsTable />
        <Wrapper direction="hr">
          <AddRoom />
          <div>Pagination</div>
        </Wrapper>
      </Wrapper>
    </>
  );
};
export default Rooms;

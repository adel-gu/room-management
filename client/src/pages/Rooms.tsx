import AddRoom from '../components/AddRoom';
import RoomsTable from '../components/RoomsTable';
import Heading from '../components/ui/Heading';
import Wrapper from '../components/ui/Wrapper';

const Rooms = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Rooms</Heading>
        <span>Filter/Sort</span>
      </Wrapper>
      <Wrapper>
        <RoomsTable />
        <AddRoom />
      </Wrapper>
    </>
  );
};
export default Rooms;

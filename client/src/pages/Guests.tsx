import Heading from '../components/ui/Heading';
import Wrapper from '../components/ui/Wrapper';
import GuestsTable from '../components/guests/GuestsTable';
import AddGuest from '../components/guests/AddGuest';
import SearchBy from '../components/SearchBy';

const Guests = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Guests</Heading>
        <SearchBy />
      </Wrapper>
      <Wrapper>
        <GuestsTable />
        <AddGuest />
      </Wrapper>
    </>
  );
};
export default Guests;

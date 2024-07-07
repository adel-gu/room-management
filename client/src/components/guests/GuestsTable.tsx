import { useReadAllGuests } from '../../hooks/guests';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import Table from '../Table';
import GuestRow from './GuestRow';

const GuestsTable = () => {
  const { guests, page, pages, total, isGuestsLoading } = useReadAllGuests();

  if (isGuestsLoading) return <Spinner />;

  return (
    <Table columns="repeat(3, 1.5fr) repeat(3, 1fr)">
      <Table.Header>
        <div>Full Name</div>
        <div>Phone</div>
        <div>Email</div>
        <div>Nationality</div>
        <div>National ID</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {guests?.map((guest) => (
          <Table.Row key={guest._id}>
            <GuestRow guest={guest} />
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Pagination pages={pages} page={page} total={total} />
      </Table.Footer>
    </Table>
  );
};
export default GuestsTable;

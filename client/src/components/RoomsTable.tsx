import styled from 'styled-components';
import { useReadAllRooms } from '../hooks/room';

import RoomRow from './RoomRow';
import Spinner from './Spinner';
import { useSearchParams } from 'react-router-dom';
import { defineRoomFilterQuery } from '../utils/defineFilters';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;

  box-shadow: var(--shadow-md);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);

  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const TableBody = styled.div`
  margin: 0.4rem 0;
`;

const RoomsTable = () => {
  const [filterParams] = useSearchParams();

  const query = defineRoomFilterQuery(
    'discount',
    filterParams.get('discount'),
    filterParams.get('page'),
  );

  const {
    data: { data: rooms, page, pages, pageSize, total } = {},
    isRoomsLoading,
  } = useReadAllRooms(query);

  if (isRoomsLoading) return <Spinner />;

  return (
    <Table>
      <TableHeader>
        <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      <TableBody>
        {rooms?.map((room) => (
          <RoomRow key={room._id} room={room} />
        ))}
      </TableBody>
    </Table>
  );
};
export default RoomsTable;

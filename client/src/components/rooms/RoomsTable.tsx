import { useReadAllRooms } from '../../hooks/rooms';

import RoomRow from './RoomRow';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import Table from '../Table';
import Empty from '../Empty';

const RoomsTable = () => {
  const { rooms, page, pages, total, isRoomsLoading } = useReadAllRooms();

  if (isRoomsLoading) return <Spinner />;
  if (!rooms?.length) return <Empty resourceName="room" />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr repeat(3, 1fr) .1fr">
      <Table.Header>
        <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Status</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {rooms?.map((room) => (
          <Table.Row key={room._id}>
            <RoomRow room={room} />
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Pagination pages={pages} page={page} total={total} />
      </Table.Footer>
    </Table>
  );
};
export default RoomsTable;

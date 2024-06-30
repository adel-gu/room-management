import styled from 'styled-components';
import { Room } from '../types/room';
import RoomRow from './RoomRow';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  /* TODO: add a box shadow */
  /* box-shadow: 10px 4px 8px 0 rgba(100, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 100, 0, 0.19); */
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

const rooms: Room[] = [
  {
    id: '001',
    name: '001',
    maxCapacity: 2,
    regularPrice: 200,
    discount: 20,
    description: '',
    image: 'room.jpg',
  },
  {
    id: '002',
    name: '002',
    maxCapacity: 2,
    regularPrice: 200,
    discount: 20,
    description: '',
    image: 'room.jpg',
  },
  {
    id: '003',
    name: '003',
    maxCapacity: 2,
    regularPrice: 200,
    discount: 20,
    description: '',
    image: 'room.jpg',
  },
  {
    id: '004',
    name: '004',
    maxCapacity: 2,
    regularPrice: 200,
    discount: 20,
    description: '',
    image: 'room.jpg',
  },
];

const RoomsTable = () => {
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
        {rooms.map((room) => (
          <RoomRow key={room.id} room={room} />
        ))}
      </TableBody>
    </Table>
  );
};
export default RoomsTable;
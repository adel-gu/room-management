import styled from 'styled-components';
import { Room } from '../types/room';
import TableRow from './ui/TableRow';

interface Props {
  room: Room;
}

const RoomImg = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const RoomName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const RoomCapacity = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

const RoomPrice = styled.div`
  font-weight: 600;
`;

const RoomDiscount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

const formatCurrency = (val?: number) => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(val ?? 0);
};

const RoomRow = ({ room }: Props) => {
  return (
    <TableRow>
      <RoomImg src={room.image} alt={`Room image for ${room.name}`} />
      <RoomName>{room.name}</RoomName>
      <RoomCapacity>Fills up to {room.maxCapacity} guests</RoomCapacity>
      <RoomPrice>{formatCurrency(room.regularPrice)}</RoomPrice>
      <RoomDiscount>{formatCurrency(room.discount)}</RoomDiscount>
      <div></div>
    </TableRow>
  );
};
export default RoomRow;

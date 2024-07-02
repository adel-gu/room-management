import styled from 'styled-components';
import { Room } from '../types/room';
import TableRow from './ui/TableRow';
import DropdownMenu from './DropdownMenu';
import { Copy, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

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
      <RoomImg
        src={room.image ?? 'room.jpg'}
        alt={`Room image for ${room.name}`}
      />
      <RoomName>{room.name}</RoomName>
      <RoomCapacity>Fills up to {room.maxCapacity} guests</RoomCapacity>
      <RoomPrice>{formatCurrency(room.regularPrice)}</RoomPrice>
      <RoomDiscount>
        {room.discount ? formatCurrency(room.discount) : '--'}
      </RoomDiscount>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <EllipsisVertical />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item
              icon={<Pencil />}
              onClick={() => {}}
              disabled={false}
            >
              edit
            </DropdownMenu.Item>
            <DropdownMenu.Item
              icon={<Copy />}
              onClick={() => {}}
              disabled={false}
            >
              duplicate
            </DropdownMenu.Item>
            <DropdownMenu.Item
              icon={<Trash2 />}
              onClick={() => {}}
              disabled={false}
            >
              delete
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    </TableRow>
  );
};
export default RoomRow;

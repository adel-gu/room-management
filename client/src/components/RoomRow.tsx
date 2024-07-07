import styled from 'styled-components';
import { Copy, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import { useCreateNewRoom, useDeleteRoom } from '../hooks/room';
import { IRoom } from '../types/room';

import DropdownMenu from './DropdownMenu';
import Modal from './Modal';
import DeleteAction from './DeleteAction';
import RoomForm from './RoomForm';

interface Props {
  room: IRoom;
}

const RoomImg = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-5px);
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
  const { deleteRoom, isDeletingRoomPending } = useDeleteRoom();
  const {
    createNewRoom: duplicateRoom,
    isCreatingRoomPending: isDuplicatingPending,
  } = useCreateNewRoom();

  const handleDuplicate = () => {
    const { _id, createdAt, ...rest } = room;
    const roomFormData = new FormData();
    for (var key in rest) {
      if (key === 'name') roomFormData.append(key, `Copy of - ${rest.name}`);
      else roomFormData.append(key, rest[key]);
    }
    duplicateRoom(roomFormData);
  };

  return (
    <>
      <RoomImg
        src={room.image ?? 'room.jpg'}
        alt={`Room image for ${room.name}`}
      />
      <RoomName>{room.name}</RoomName>
      <RoomCapacity>Fills up to {room.maxCapacity} guests</RoomCapacity>
      <RoomPrice>{formatCurrency(room.regularPrice)}</RoomPrice>
      <RoomDiscount>
        {room.discount === 0 ? '--' : formatCurrency(room.discount)}
      </RoomDiscount>
      <Modal>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <EllipsisVertical />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <Modal.Trigger name="edit">
                <DropdownMenu.Item
                  icon={<Pencil />}
                  disabled={isDuplicatingPending}
                >
                  edit
                </DropdownMenu.Item>
              </Modal.Trigger>
              <DropdownMenu.Item
                icon={<Copy />}
                disabled={isDuplicatingPending}
                onClick={handleDuplicate}
              >
                duplicate
              </DropdownMenu.Item>
              <Modal.Trigger name="delete">
                <DropdownMenu.Item
                  icon={<Trash2 />}
                  disabled={isDuplicatingPending}
                >
                  delete
                </DropdownMenu.Item>
              </Modal.Trigger>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <Modal.Content name="edit">
          <RoomForm room={room} />
        </Modal.Content>
        <Modal.Content name="delete">
          <DeleteAction
            resourceName="Room"
            handleDeleteAction={() => deleteRoom(room._id)}
            disabled={isDeletingRoomPending}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
export default RoomRow;

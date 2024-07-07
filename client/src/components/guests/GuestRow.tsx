import { Copy, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { IGuest } from '../../types/guest';

import DropdownMenu from '../DropdownMenu';
import Modal from '../Modal';
import DeleteAction from '../DeleteAction';
import styled from 'styled-components';
import GuestForm from './GuestForm';

interface Props {
  guest: IGuest;
}

const StyledCell = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const GuestRow = ({ guest }: Props) => {
  return (
    <>
      <StyledCell>{guest.fullName}</StyledCell>
      <StyledCell>{guest.phone}</StyledCell>
      <StyledCell>{guest.email ?? '--'}</StyledCell>
      <StyledCell>{guest.nationality}</StyledCell>
      <StyledCell>{guest.nationalID}</StyledCell>
      <Modal>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <EllipsisVertical />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <Modal.Trigger name="edit">
                <DropdownMenu.Item icon={<Pencil />} disabled={false}>
                  edit
                </DropdownMenu.Item>
              </Modal.Trigger>
              <DropdownMenu.Item
                icon={<Copy />}
                disabled={false}
                onClick={() => {}}
              >
                duplicate
              </DropdownMenu.Item>
              <Modal.Trigger name="delete">
                <DropdownMenu.Item icon={<Trash2 />} disabled={false}>
                  delete
                </DropdownMenu.Item>
              </Modal.Trigger>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <Modal.Content name="edit">
          <GuestForm guest={guest} />
        </Modal.Content>
        <Modal.Content name="delete">
          <DeleteAction
            resourceName="Guest"
            handleDeleteAction={() => {}}
            disabled={false}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
export default GuestRow;

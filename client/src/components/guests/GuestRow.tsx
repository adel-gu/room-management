import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { IGuest } from '../../types/guest';

import DropdownMenu from '../DropdownMenu';
import Modal from '../Modal';
import DeleteAction from '../DeleteAction';
import styled from 'styled-components';
import GuestForm from './GuestForm';
import { useDeleteGuest } from '../../hooks/guests';
import { countries } from '../../utils/countries';

interface Props {
  guest: IGuest;
}

const StyledCell = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const GuestRow = ({ guest }: Props) => {
  const { deleteGuest, isDeletingGuestPending } = useDeleteGuest();

  const country = countries.find((ct) => ct.label === guest.nationality);

  return (
    <>
      <StyledCell>{guest.fullName}</StyledCell>
      <StyledCell>{guest.phone}</StyledCell>
      <StyledCell>{guest.email ?? '--'}</StyledCell>
      <StyledCell>
        {country ? `${country?.icon} ${country?.label}` : guest.nationality}
      </StyledCell>
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
            handleDeleteAction={() => deleteGuest(guest._id)}
            disabled={isDeletingGuestPending}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
export default GuestRow;

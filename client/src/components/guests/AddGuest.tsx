import Modal from '../Modal';
import Button from '../ui/Button';
import GuestForm from './GuestForm';

const AddGuest = () => {
  return (
    <div>
      <Modal>
        <Modal.Trigger name="add-guest">
          <Button>Add new guest</Button>
        </Modal.Trigger>
        <Modal.Content name="add-guest">
          <GuestForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default AddGuest;

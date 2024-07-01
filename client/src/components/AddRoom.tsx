import RoomForm from './RoomForm';
import Button from './ui/Button';
import Modal from './Modal';

const AddRoom = () => {
  return (
    <div>
      <Modal>
        <Modal.Trigger>
          <Button>Add new room</Button>
        </Modal.Trigger>
        <Modal.Content>
          <RoomForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default AddRoom;

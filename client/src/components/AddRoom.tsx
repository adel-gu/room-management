import RoomForm from './RoomForm';
import Button from './ui/Button';
import Modal from './Modal';

const AddRoom = () => {
  return (
    <div>
      <Modal>
        <Modal.Trigger name="add-room">
          <Button>Add new room</Button>
        </Modal.Trigger>
        <Modal.Content name="add-room">
          <RoomForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default AddRoom;

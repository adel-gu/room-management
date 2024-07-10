import Modal from '../Modal';
import Button from '../ui/Button';
import BookingForm from './BookingForm';

const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Trigger name="add-guest">
          <Button>Add Booking</Button>
        </Modal.Trigger>
        <Modal.Content name="add-guest">
          <BookingForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default AddBooking;

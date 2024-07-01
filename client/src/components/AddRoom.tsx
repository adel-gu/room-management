import { useState } from 'react';
import RoomForm from './RoomForm';
import Button from './ui/Button';

const AddRoom = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add new room</Button>
      <div>{isOpen && <RoomForm />}</div>
    </div>
  );
};
export default AddRoom;

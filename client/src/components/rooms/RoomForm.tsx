import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, IRoom, RoomFormData } from '../../types/room';

import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../FormRow';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import PhotoInput from '../ui/PhotoInput';
import { useCreateNewRoom, useEditRoom } from '../../hooks/room';
import Spinner from '../Spinner';

interface Props {
  handleclose?: () => void;
  room?: IRoom;
}

const RoomForm = ({ handleclose, room }: Props) => {
  const form = useForm<RoomFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: room,
  });
  const { createNewRoom, isCreatingRoomPending } = useCreateNewRoom();
  const { editRoom, isEditingRoomPending } = useEditRoom();

  const isEditing = !!room;
  const disabledBtn = isCreatingRoomPending || isEditingRoomPending;

  const onSubmit = (data: RoomFormData) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('maxCapacity', data.maxCapacity.toString());
    formData.append('regularPrice', data.regularPrice.toString());

    if (data.discount !== null && data.discount !== undefined)
      formData.append('discount', data.discount.toString());
    if (data.description)
      formData.append('description', data.description.toString());
    if (data.roomImage) formData.append('roomImage', data.roomImage);

    if (isEditing) {
      editRoom(
        { roomId: room._id, editedData: formData },
        {
          onSuccess: () => handleclose?.(),
        },
      );
    } else {
      createNewRoom(formData, {
        onSuccess: () => {
          form.reset();
          handleclose?.();
        },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow id="name" label="Room name">
          <Input
            type="text"
            id="name"
            {...form.register('name')}
            disabled={isCreatingRoomPending}
          />
        </FormRow>

        <FormRow id="maxCapacity" label="Maximum capacity">
          <Input
            type="number"
            id="maxCapacity"
            {...form.register('maxCapacity')}
            disabled={isCreatingRoomPending}
          />
        </FormRow>

        <FormRow id="regularPrice" label="Regular price">
          <Input
            type="number"
            id="regularPrice"
            {...form.register('regularPrice')}
            disabled={isCreatingRoomPending}
          />
        </FormRow>

        <FormRow id="discount" label="Discount">
          <Input
            type="number"
            id="discount"
            {...form.register('discount')}
            defaultValue={0}
            disabled={isCreatingRoomPending}
          />
        </FormRow>

        <FormRow id="description" label="Description">
          <Textarea
            id="description"
            {...form.register('description')}
            disabled={isCreatingRoomPending}
          />
        </FormRow>

        <FormRow id="roomImage" label="Room photo">
          <PhotoInput
            id="roomImage"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              form.setValue('roomImage', file);
            }}
            disabled={isCreatingRoomPending}
          />
        </FormRow>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={handleclose}
            disabled={disabledBtn}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={disabledBtn}>
            {disabledBtn ? (
              <Spinner size="sm" color="secondary" />
            ) : isEditing ? (
              'Edit'
            ) : (
              'Create'
            )}
          </Button>
        </FormRow>
      </Form>
    </FormProvider>
  );
};
export default RoomForm;

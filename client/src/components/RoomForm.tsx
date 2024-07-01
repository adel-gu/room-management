import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, RoomFormData } from '../types/room';

import Button from './ui/Button';
import Form from './ui/Form';
import FormRow from './FormRow';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import PhotoInput from './ui/PhotoInput';

const RoomForm = () => {
  const form = useForm<RoomFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: RoomFormData) => {
    // TODO: convert data to formData
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow id="name" label="Room name">
          <Input type="text" id="name" {...form.register('name')} />
        </FormRow>

        <FormRow id="maxCapacity" label="Maximum capacity">
          <Input
            type="number"
            id="maxCapacity"
            {...form.register('maxCapacity')}
          />
        </FormRow>

        <FormRow id="regularPrice" label="Regular price">
          <Input
            type="number"
            id="regularPrice"
            {...form.register('regularPrice')}
          />
        </FormRow>

        <FormRow id="discount" label="Discount">
          <Input
            type="number"
            id="discount"
            {...form.register('discount')}
            defaultValue={0}
          />
        </FormRow>

        <FormRow id="description" label="Description">
          <Textarea id="description" {...form.register('description')} />
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
          />
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit">Create Room</Button>
        </FormRow>
      </Form>
    </FormProvider>
  );
};
export default RoomForm;

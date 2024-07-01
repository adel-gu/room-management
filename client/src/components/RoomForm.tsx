import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, RoomFormData } from '../types/room';
import Button from './ui/Button';
import Form from './ui/Form';

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
        <div>
          <label htmlFor="name">Room name</label>
          <input
            id="name"
            {...form.register('name', { required: 'this field is required' })}
          />
          <p>{form.formState.errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="maxCapacity">Maximum capacity</label>
          <input
            type="number"
            id="maxCapacity"
            {...form.register('maxCapacity')}
          />
          <p>{form.formState.errors.maxCapacity?.message}</p>
        </div>

        <div>
          <label htmlFor="regularPrice">Regular price</label>
          <input
            type="number"
            id="regularPrice"
            {...form.register('regularPrice')}
          />
          <p>{form.formState.errors.regularPrice?.message}</p>
        </div>

        <div>
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            id="discount"
            {...form.register('discount')}
            defaultValue={0}
          />
          <p>{form.formState.errors.discount?.message}</p>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" {...form.register('description')} />
          <p>{form.formState.errors.description?.message}</p>
        </div>

        <div>
          <label htmlFor="roomImage">Room photo</label>
          <input
            id="roomImage"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              form.setValue('roomImage', file);
            }}
          />
          <p>{form.formState.errors.roomImage?.message}</p>
        </div>

        <div>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit">Create Room</Button>
        </div>
      </Form>
    </FormProvider>
  );
};
export default RoomForm;

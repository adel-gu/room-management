import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IGuest, GuestFormData, formSchema } from '../../types/guest';

import Form from '../ui/Form';
import FormRow from '../FormRow';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../Spinner';
import { useCreateNewGuest } from '../../hooks/guests';

interface Props {
  handleclose?: () => void;
  guest?: IGuest;
}

const GuestForm = ({ handleclose, guest }: Props) => {
  const form = useForm<GuestFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: guest,
  });
  const { createNewGuest, isCreatingGuestPending } = useCreateNewGuest();

  const onSubmit = (data: GuestFormData) => {
    createNewGuest(data, {
      onSuccess: () => {
        form.reset();
        handleclose?.();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow id="fullName" label="Full name">
          <Input
            type="text"
            id="fullName"
            {...form.register('fullName')}
            disabled={isCreatingGuestPending}
          />
        </FormRow>

        <FormRow id="phone" label="Phone">
          <Input
            type="text"
            id="phone"
            {...form.register('phone')}
            disabled={isCreatingGuestPending}
          />
        </FormRow>

        <FormRow id="email" label="Email">
          <Input
            type="email"
            id="email"
            {...form.register('email')}
            disabled={isCreatingGuestPending}
          />
        </FormRow>

        <FormRow id="nationality" label="Nationality">
          <Input
            type="text"
            id="nationality"
            {...form.register('nationality')}
            disabled={isCreatingGuestPending}
          />
        </FormRow>

        <FormRow id="nationalID" label="National ID">
          <Input
            type="text"
            id="nationalID"
            {...form.register('nationalID')}
            disabled={isCreatingGuestPending}
          />
        </FormRow>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={handleclose}
            disabled={isCreatingGuestPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isCreatingGuestPending}>
            {isCreatingGuestPending ? (
              <Spinner size="sm" color="secondary" />
            ) : false ? (
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
export default GuestForm;

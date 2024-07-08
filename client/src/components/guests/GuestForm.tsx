import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IGuest, GuestFormData, formSchema } from '../../types/guest';

import Form from '../ui/Form';
import FormRow from '../FormRow';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../Spinner';
import { useCreateNewGuest, useEditGuest } from '../../hooks/guests';
import Select from '../ui/Select';
import { countries } from '../../utils/countries';

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
  const { editGuest, isEditingGuestPending } = useEditGuest();

  const isEditing = !!guest;
  const disabledBtn = isCreatingGuestPending || isEditingGuestPending;

  const onSubmit = (data: GuestFormData) => {
    if (isEditing) {
      editGuest(
        { guestId: guest._id, editedData: data },
        { onSuccess: () => handleclose?.() },
      );
    } else {
      createNewGuest(data, {
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
          <Select id="nationality" {...form.register('nationality')}>
            {countries.map((country) => (
              <option
                value={country.value}
                key={country.value + country.icon + `${Math.random()}`}
              >
                {country.icon} {country.label}
              </option>
            ))}
          </Select>
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
export default GuestForm;

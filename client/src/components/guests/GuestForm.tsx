import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IGuest, GuestFormData, formSchema } from '../../types/guest';

import Form from '../ui/Form';
import FormRow from '../FormRow';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../Spinner';

interface Props {
  handleclose?: () => void;
  guest?: IGuest;
}

const GuestForm = ({ handleclose, guest }: Props) => {
  const form = useForm<GuestFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: guest,
  });

  const onSubmit = (data: GuestFormData) => {
    console.log('DATA: ', data);
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow id="fullName" label="Full name">
          <Input
            type="text"
            id="fullName"
            {...form.register('fullName')}
            disabled={false}
          />
        </FormRow>

        <FormRow id="phone" label="Phone">
          <Input
            type="text"
            id="phone"
            {...form.register('phone')}
            disabled={false}
          />
        </FormRow>

        <FormRow id="email" label="Email">
          <Input
            type="email"
            id="email"
            {...form.register('email')}
            disabled={false}
          />
        </FormRow>

        <FormRow id="nationality" label="Nationality">
          <Input
            type="text"
            id="nationality"
            {...form.register('nationality')}
            disabled={false}
          />
        </FormRow>

        <FormRow id="nationalID" label="National ID">
          <Input
            type="text"
            id="nationalID"
            {...form.register('nationalID')}
            disabled={false}
          />
        </FormRow>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={handleclose}
            disabled={false}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={false}>
            {false ? (
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

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BookingFormData, formSchema, IBooking } from '../../types/bookings';

import Form from '../ui/Form';
import FormRow from '../FormRow';
import Input from '../ui/Input';
import Button from '../ui/Button';

import Spinner from '../Spinner';
import Textarea from '../ui/Textarea';

import { useReadAllRooms } from '../../hooks/rooms';
import { useReadAllGuests } from '../../hooks/guests';
import styled from 'styled-components';
import AutoCompleteInput from '../AutoCompleteInput';
import AutoCompleteInputItem from '../AutoCompleteInputItem';
import { useCreateNewBooking } from '../../hooks/bookings';
import Select from '../ui/Select';
import { BookingStatus } from '../../utils/constants';

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  border: 1px solid red;
`;

interface Props {
  handleclose?: () => void;
  booking?: IBooking;
}

const BookingForm = ({ handleclose, booking }: Props) => {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   ...booking,
    //   room: booking?.room._id ?? '',
    //   guest: booking?.guest._id ?? '',
    // },
  });

  const { createNewBooking, isCreatingBookingPending } = useCreateNewBooking();
  const { rooms } = useReadAllRooms();
  const { guests } = useReadAllGuests();

  const disabledBtn = false;
  const isEditing = false;

  const hasBreakfast = form.watch('hasBreakfast');

  useEffect(() => {
    if (!hasBreakfast) {
      form.unregister('extraPrice');
    }
  }, [hasBreakfast, form.unregister]);

  const onSubmit = (data: BookingFormData) => {
    createNewBooking(data, {
      onSuccess: () => {
        form.reset();
        handleclose?.();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow id="room" label="Room">
          <AutoCompleteInput
            name="room"
            disable={isCreatingBookingPending}
            items={rooms?.map((room) => ({ id: room._id, name: room.name }))}
            render={(item) => (
              <AutoCompleteInputItem key={item.id} item={item} name="room" />
            )}
          />
        </FormRow>

        <FormRow id="guest" label="Guest">
          <AutoCompleteInput
            name="guest"
            disable={isCreatingBookingPending}
            items={guests?.map((guest) => ({
              id: guest._id,
              name: guest.fullName,
            }))}
            render={(item) => (
              <AutoCompleteInputItem key={item.id} item={item} name="guest" />
            )}
          />
        </FormRow>

        <FormRow id="startDate" label="Check in date">
          <Input
            type="date"
            id="startDate"
            {...form.register('startDate')}
            disabled={isCreatingBookingPending}
          />
        </FormRow>

        <FormRow id="endDate" label="Check out date">
          <Input
            type="date"
            id="endDate"
            {...form.register('endDate')}
            disabled={isCreatingBookingPending}
          />
        </FormRow>

        <FormRow id="numGuests" label="Number of guests">
          <Input
            type="number"
            id="numGuests"
            {...form.register('numGuests')}
            defaultValue={1}
            disabled={isCreatingBookingPending}
          />
        </FormRow>

        <FormRow id="status" label="Status">
          <Select id="status" {...form.register('status')}>
            {Object.values(BookingStatus).map((s: BookingStatus) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormRow>

        <FormRow id="hasBreakfast" label="Has Breakfast?" ischeckbox="true">
          <CheckBox
            type="checkbox"
            value="hasBreakfast"
            {...form.register('hasBreakfast')}
          />
        </FormRow>

        {form.watch('hasBreakfast')?.valueOf() && (
          <FormRow id="extraPrice" label="Extra price">
            <Input
              type="number"
              id="extraPrice"
              {...form.register('extraPrice')}
              disabled={isCreatingBookingPending}
            />
          </FormRow>
        )}

        <FormRow id="isPaid" label="Paid?" ischeckbox="true">
          <CheckBox
            type="checkbox"
            value="isPaid"
            {...form.register('isPaid')}
          />
        </FormRow>

        <FormRow id="observations" label="Observations">
          <Textarea
            id="observations"
            {...form.register('observations')}
            disabled={isCreatingBookingPending}
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
export default BookingForm;

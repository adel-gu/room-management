import {
  BookingFormData,
  GetAllBookingsResType,
  IBooking,
  ICheckInOut,
} from '../../types/bookings';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/bookings`;

export const readAllBookingsRequest = async (
  query: string,
): Promise<GetAllBookingsResType> => {
  const res = await fetch(`${API_BASE_URL}${query}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error Fetching bookings!');
  const { data } = await res.json();

  return data;
};

export const readBookingDetailsRequest = async (
  bookingId: string,
): Promise<IBooking> => {
  const res = await fetch(`${API_BASE_URL}/${bookingId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error Fetching booking!');
  const { data } = await res.json();

  return data;
};

export const createNewBookingRequest = async (
  booking: BookingFormData,
): Promise<IBooking> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  if (!res.ok) throw new Error('Failed to create new booking');

  const { data } = await res.json();
  return data;
};

export const editBookingRequest = async ({
  bookingId,
  editedData,
}: {
  bookingId: string;
  editedData: ICheckInOut;
}) => {
  const res = await fetch(`${API_BASE_URL}/${bookingId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(editedData),
  });

  if (!res.ok) throw new Error('Failed to update booking');

  const { data } = await res.json();

  return data;
};

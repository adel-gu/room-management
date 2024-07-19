export enum RoomStatus {
  Available = 'Available',
  Reserved = 'Reserved',
  Occupied = 'Occupied',
  Cleaning = 'Cleaning',
  Maintenance = 'Maintenance',
}

export enum GuestStatus {
  Pending = 'Pending',
  Reserved = 'Reserved',
  CheckedIn = 'CheckedIn',
  CheckedOut = 'CheckedOut',
  Cancelled = 'Cancelled',
  NoShow = 'NoShow',
}

export enum BookingStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
  CheckedOut = 'CheckedOut',
  Cancelled = 'Cancelled',
  NoShow = 'NoShow',
}

export enum Roles {
  admin = 'admin',
}

/* -------------------------------------------------------------------------- */
/*                               Duration chart                               */
/* -------------------------------------------------------------------------- */
export const startDataLight = [
  {
    numNights: '1 night',
    numBookings: 0,
    color: '#ef4444',
  },
  {
    numNights: '2 nights',
    numBookings: 0,
    color: '#f97316',
  },
  {
    numNights: '3 nights',
    numBookings: 0,
    color: '#eab308',
  },
  {
    numNights: '4-5 nights',
    numBookings: 0,
    color: '#84cc16',
  },
  {
    numNights: '6-7 nights',
    numBookings: 0,
    color: '#22c55e',
  },
  {
    numNights: '8-14 nights',
    numBookings: 0,
    color: '#14b8a6',
  },
  {
    numNights: '15-21 nights',
    numBookings: 0,
    color: '#3b82f6',
  },
  {
    numNights: '21+ nights',
    numBookings: 0,
    color: '#a855f7',
  },
];

export const startDataDark = [
  {
    numNights: '1 night',
    numBookings: 0,
    color: '#b91c1c',
  },
  {
    numNights: '2 nights',
    numBookings: 0,
    color: '#c2410c',
  },
  {
    numNights: '3 nights',
    numBookings: 0,
    color: '#a16207',
  },
  {
    numNights: '4-5 nights',
    numBookings: 0,
    color: '#4d7c0f',
  },
  {
    numNights: '6-7 nights',
    numBookings: 0,
    color: '#15803d',
  },
  {
    numNights: '8-14 nights',
    numBookings: 0,
    color: '#0f766e',
  },
  {
    numNights: '15-21 nights',
    numBookings: 0,
    color: '#1d4ed8',
  },
  {
    numNights: '21+ nights',
    numBookings: 0,
    color: '#7e22ce',
  },
];

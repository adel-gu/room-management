export enum ModelsEnum {
  Room = 'Room',
  Guest = 'Guest',
  Booking = 'Booking',
  Admin = 'Admin',
}

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

export const LIMIT = 10;

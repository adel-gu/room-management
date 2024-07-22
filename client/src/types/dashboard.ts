export interface IStats {
  _id: null;
  totalBookings: number;
  totalSales: number;
  stays: number;
}

export interface ITodayActivity {
  _id: string;
  bookingId: string;
  fullName: string;
  nationality: string;
  status: string;
  numNights: number;
}

export interface IStaysNights {
  numBookings: number;
  numNights: number;
}

export interface ISales {
  date: string;
  extraSales: number;
  totalSales: number;
}

export type StartData = {
  numNights: string;
  numBookings: number;
  color: string;
};

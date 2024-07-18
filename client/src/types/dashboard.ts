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

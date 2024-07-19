import { NextFunction, Request, Response } from 'express';
import catchErrors from '../../utils/catchErrors';
import Booking from '../../models/bookings';
import { BookingStatus } from '../../utils/constants';

const getStaysNights = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await Booking.aggregate([
      {
        $match: {
          status: BookingStatus.CheckedIn,
        },
      },
      {
        $group: {
          _id: '$numNights',
          numBookings: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          numNights: '$_id',
          numBookings: 1,
        },
      },
      {
        $sort: {
          numNights: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  },
);

export default getStaysNights;

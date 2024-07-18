import { NextFunction, Request, Response } from 'express';
import catchErrors from '../../utils/catchErrors';
import Booking from '../../models/bookings';
import { BookingStatus } from '../../utils/constants';

const getTodayActivities = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [result] = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
          status: {
            $in: [
              BookingStatus.CheckedIn,
              BookingStatus.CheckedOut,
              BookingStatus.Pending,
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'guests',
          localField: 'guest',
          foreignField: '_id',
          as: 'guestDetails',
        },
      },
      {
        $unwind: '$guestDetails',
      },
      {
        $group: {
          _id: null,
          guests: {
            $push: {
              _id: '$guestDetails._id',
              bookingId: '$_id',
              fullName: '$guestDetails.fullName',
              nationality: '$guestDetails.nationality',
              status: '$guestDetails.status',
              numNights: '$numNights',
            },
          },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  },
);

export default getTodayActivities;

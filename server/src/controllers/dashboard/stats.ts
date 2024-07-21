import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../utils/catchErrors';
import Booking from '../../models/bookings';
import { BookingStatus } from '../../utils/constants';
import getPeriod from '../../utils/getQueryPeriods';

const getStats = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryDate = (req.query.last as string) ?? '7';

    const filter = getPeriod(queryDate);

    const [result] = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: filter.date },
          status: {
            $in: [BookingStatus.CheckedIn, BookingStatus.CheckedOut],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalSales: {
            $sum: { $ifNull: ['$totalPrice', 0] },
          },
          stays: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  },
);

export default getStats;

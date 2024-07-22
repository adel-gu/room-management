import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../utils/catchErrors';
import Booking from '../../models/bookings';
import { BookingStatus } from '../../utils/constants';
import getPeriod from '../../utils/getQueryPeriods';

const getSales = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryDate = (req.query.last as string) ?? '7';

    const filter = getPeriod(queryDate);

    const result = await Booking.aggregate([
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
          _id: '$createdAt',
          extraSales: {
            $sum: { $ifNull: ['$extraPrice', 0] },
          },
          totalSales: {
            $sum: { $ifNull: ['$totalPrice', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          extraSales: 1,
          totalSales: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  },
);

export default getSales;

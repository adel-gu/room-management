import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../utils/catchErrors';
import Booking from '../../models/bookings';
import { BookingStatus } from '../../utils/constants';
import getPeriod from '../../utils/getQueryPeriods';

const getSales = catchErrors(
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
          _id: '$createdAt',
          totalSales: {
            $sum: { $ifNull: ['$totalPrice', 0] },
          },
          extraSales: {
            $sum: { $ifNull: ['$extraPrice', 0] },
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

export default getSales;

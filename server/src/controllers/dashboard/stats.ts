import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../utils/catchErrors';
import Booking from '../../models/bookings';
import { BookingStatus } from '../../utils/constants';

const getStats = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryDate = req.query.last ?? '7';
    const now = new Date();
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const periods = [
      { name: '7', date: last7Days },
      { name: '30', date: last30Days },
      { name: '90', date: last90Days },
    ];

    const filter =
      periods.find((period) => period.name === queryDate) ?? periods[0];
    // console.log('QUERY DATE: ', filter);

    const [result] = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: filter.date },
        },
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalSales: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$status', BookingStatus.CheckedIn] },
                    { $eq: ['$status', BookingStatus.CheckedOut] },
                  ],
                },
                { $ifNull: ['$totalPrice', 0] },
                0,
              ],
            },
          },
          stays: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$status', BookingStatus.CheckedIn] },
                    { $eq: ['$status', BookingStatus.CheckedOut] },
                  ],
                },
                1,
                0,
              ],
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

export default getStats;

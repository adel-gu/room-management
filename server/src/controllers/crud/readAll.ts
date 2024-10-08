import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import QueryHelper from '../../utils/queryHelper';
import { LIMIT } from '../../utils/constants';
import catchErrors from '../../utils/catchErrors';

const readAllDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    let query = new QueryHelper(
      Model.find({ tenantId: req.tenantId }),
      req.query,
    )
      .filter()
      .search();

    const total = await query.getQuery().clone().countDocuments();
    const pages = Math.ceil(total / LIMIT) || 1;

    const currentPage = page > pages ? pages : page;

    query = query.sort().paginate(currentPage);
    const docs = await query.getQuery();

    const pagination = {
      page: currentPage,
      pages,
      pageSize: LIMIT,
      total,
      data: docs,
    };

    res.status(200).json({ status: 'success', data: pagination });
  });

export default readAllDoc;

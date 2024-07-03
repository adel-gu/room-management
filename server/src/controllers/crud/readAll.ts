import { Request, Response } from 'express';
import mongoose from 'mongoose';
import QueryHelper from '../../utils/queryHelper';
import { LIMIT } from '../../utils/constants';

const readAllDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    let query = new QueryHelper(Model.find(), req.query)
      .filter()
      .sort()
      .paginate(page);

    const docs = await query.getQuery();
    const totalDocs = await Model.countDocuments();
    const totalPages = Math.ceil(totalDocs / LIMIT);

    const pagination = {
      currentPage: page,
      totalPages,
      totalDocs,
      pageSize: LIMIT,
      data: docs,
    };

    res.status(200).json({ status: 'success', data: pagination });
  } catch (error) {
    console.log('ERROR 💥:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

export default readAllDoc;

import { Document, Query } from 'mongoose';
import { LIMIT } from './constants';

interface QueryString {
  page?: string;
  sort?: string;
  [key: string]: any;
}

class QueryHelper<T extends Document> {
  private query: Query<T[], any>;
  private queryString: QueryString;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1. Basic query
    let queryObj = { ...this.queryString };
    const excludeParams = ['sort', 'limit', 'page'];
    excludeParams.forEach((param) => delete queryObj[param]);

    // 2. advance filtering
    const queryStr = JSON.stringify(queryObj);
    queryObj = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sort = (this.queryString.sort as string).split(',').join(' ');
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginate(page: number) {
    const skip = (page - 1) * LIMIT;

    this.query = this.query.skip(skip).limit(LIMIT);

    return this;
  }

  getQuery() {
    return this.query;
  }
}

export default QueryHelper;

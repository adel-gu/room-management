import { formatDistance } from 'date-fns';

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value,
  );

export const formatDistanceFromNow = (date: Date) =>
  formatDistance(date, new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

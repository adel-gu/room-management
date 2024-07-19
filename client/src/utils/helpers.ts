import { formatDistance } from 'date-fns';
import { IStaysNights, StartData } from '../types/dashboard';

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

/* -------------------------------------------------------------------------- */
/*                               Duration chart                               */
/* -------------------------------------------------------------------------- */
export const prepareData = (startData: StartData[], stays: IStaysNights[]) => {
  function getNumNightsCategory(numNights: number) {
    if (numNights === 1) return '1 night';
    if (numNights === 2) return '2 nights';
    if (numNights === 3) return '3 nights';
    if (numNights >= 4 && numNights <= 5) return '4-5 nights';
    if (numNights >= 6 && numNights <= 7) return '6-7 nights';
    if (numNights >= 8 && numNights <= 14) return '8-14 nights';
    if (numNights >= 15 && numNights <= 21) return '15-21 nights';
    if (numNights > 21) return '21+ nights';
    return null;
  }

  let data: StartData[] = [];

  stays.forEach((stay) => {
    const category = getNumNightsCategory(stay.numNights);
    if (category) {
      const sData = startData.find((d) => d.numNights === category);

      if (sData) data.push({ ...sData, numBookings: stay.numBookings });
    }
  });

  return data;
};

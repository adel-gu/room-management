import styled from 'styled-components';
import DashboardBox from '../ui/DashboardBox';
import { useReadSales } from '../../hooks/dashboard';

import { useSearchParams } from 'react-router-dom';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import Heading from '../ui/Heading';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = () => {
  const { sales } = useReadSales();
  const [searchParams] = useSearchParams();

  const range = searchParams.get('last') ?? '7';
  const rangeDates = eachDayOfInterval({
    start: subDays(new Date(), parseInt(range) - 1),
    end: new Date(),
  });

  const data = rangeDates.map((date) => ({
    label: format(date, 'MMM dd'),
    extraSales:
      sales?.filter((sale) => isSameDay(date, new Date(sale.date)))[0]
        ?.extraSales ?? 0,
    totalSales:
      sales?.filter((sale) => isSameDay(date, new Date(sale.date)))[0]
        ?.totalSales ?? 0,
  }));

  const colors = {
    totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
    extraSales: { stroke: '#16a34a', fill: '#dcfce7' },
    text: '#374151',
    background: '#fff',
  };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(rangeDates[0], 'MMM dd yyyy')} &mdash;{' '}
        {format(rangeDates[rangeDates.length - 1], 'MMM dd yyyy')}{' '}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="extraSales"
            type="monotone"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
            strokeWidth={2}
            name="Extra sales"
            unit="$"
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};
export default SalesChart;

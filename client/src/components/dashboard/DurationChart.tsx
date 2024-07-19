import styled from 'styled-components';
import { useReadStaysNights } from '../../hooks/dashboard';
import { startDataLight } from '../../utils/constants';
import { prepareData } from '../../utils/helpers';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Heading from '../ui/Heading';
import Spinner from '../Spinner';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const numNightsChart = () => {
  const { staysNights, isStaysNightsLoading } = useReadStaysNights();
  const data = prepareData(startDataLight, staysNights ?? []);

  if (isStaysNightsLoading) return <Spinner />;

  return (
    <ChartBox>
      <Heading as="h2">Stay durations summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="numNights"
            dataKey="numBookings"
            innerRadius={80}
            outerRadius={110}
            cx="40%"
            cy="50%"
          >
            {startDataLight.map((entry) => (
              <Cell fill={entry.color} strokeWidth={5} key={entry.numNights} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width={150}
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};
export default numNightsChart;

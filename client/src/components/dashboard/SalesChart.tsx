import styled from 'styled-components';
import DashboardBox from '../ui/DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = () => {
  return <StyledSalesChart>SalesChart</StyledSalesChart>;
};
export default SalesChart;

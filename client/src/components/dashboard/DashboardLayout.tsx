import styled from 'styled-components';
import { useReadStats } from '../../hooks/dashboard';
import Spinner from '../Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import TodayActivities from './TodayActivities';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { stats, isStatsLoading } = useReadStats();

  if (isStatsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats stats={stats} />
      <TodayActivities />
      <div>Chart stay duration</div>
      <SalesChart />
    </StyledDashboardLayout>
  );
};
export default DashboardLayout;

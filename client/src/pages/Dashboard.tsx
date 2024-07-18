import DashboardLayout from '../components/dashboard/DashboardLayout';
import Heading from '../components/ui/Heading';
import Wrapper from '../components/ui/Wrapper';

const Dashboard = () => {
  return (
    <>
      <Wrapper>
        <Heading as="h1">Dashboard</Heading>
        {/* Filters */}
      </Wrapper>

      <DashboardLayout />
    </>
  );
};
export default Dashboard;

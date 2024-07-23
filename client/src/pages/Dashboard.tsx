import DashboardLayout from '../components/dashboard/DashboardLayout';
import QueryOperations from '../components/QueryOperations';
import Heading from '../components/ui/Heading';
import Wrapper from '../components/ui/Wrapper';

const filterObj = {
  field: 'last',
  options: [
    { value: '7', label: 'Last 7 days' },
    { value: `30`, label: 'Last 30 days' },
    { value: `90`, label: 'Last 90 days' },
  ],
};

const Dashboard = () => {
  return (
    <>
      <Wrapper direction="hr">
        <Heading as="h1">Dashboard</Heading>
        <QueryOperations filterObj={filterObj} />
      </Wrapper>

      <DashboardLayout />
    </>
  );
};
export default Dashboard;

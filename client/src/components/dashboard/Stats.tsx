import {
  Banknote,
  BarChart,
  BriefcaseBusiness,
  CalendarDays,
} from 'lucide-react';
import { IStats } from '../../types/dashboard';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

interface Props {
  stats?: IStats;
}

const Stats = ({ stats }: Props) => {
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<BriefcaseBusiness />}
        value={stats?.totalBookings ?? 0}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<Banknote />}
        value={formatCurrency(stats?.totalSales ?? 0)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<CalendarDays />}
        value={stats?.stays ?? 0}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<BarChart />}
        value={0}
      />
    </>
  );
};
export default Stats;

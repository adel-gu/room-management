import styled from 'styled-components';
import { ITodayActivity } from '../../types/dashboard';
import { countries } from '../../utils/countries';
import Badge from '../ui/Badge';
import { GuestStatus } from '../../utils/constants';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const TodayActivityItem = ({ activity }: { activity: ITodayActivity }) => {
  const { bookingId, fullName, nationality, status, numNights } = activity;
  const country = countries.find((ct) => ct.label === nationality);

  return (
    <StyledTodayItem>
      <Badge status={status}>{status}</Badge>
      <span>{country ? `${country?.icon}` : nationality}</span>
      <Guest>{fullName}</Guest>
      <div>
        {numNights} {numNights === 1 ? 'night' : 'nights'}
      </div>

      {status === GuestStatus.Reserved && (
        <Button
          size="sm"
          variation="primary"
          as={Link}
          to={`/checkin/${bookingId}`}
        >
          Check in
        </Button>
      )}

      {status === GuestStatus.CheckedIn && (
        <CheckoutButton bookingId={bookingId} />
      )}
    </StyledTodayItem>
  );
};
export default TodayActivityItem;

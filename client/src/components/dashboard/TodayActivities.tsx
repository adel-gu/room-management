import styled from 'styled-components';

// import TodayItem from './TodayItem';
import Wrapper from '../ui/Wrapper';
import Heading from '../ui/Heading';
import { useReadTodayActivities } from '../../hooks/dashboard';
import Spinner from '../Spinner';
import TodayActivityItem from './TodayActivityItem';

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const TodayActivities = () => {
  const { activities, isActivitiesLoading } = useReadTodayActivities();

  return (
    <StyledToday>
      <Wrapper direction="hr">
        <Heading as="h2">Today</Heading>
      </Wrapper>

      {!isActivitiesLoading ? (
        activities?.length ?? 0 > 0 ? (
          <TodayList>
            {activities?.map((activity) => (
              <TodayActivityItem activity={activity} key={activity._id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
};

export default TodayActivities;

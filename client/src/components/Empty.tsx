import styled from 'styled-components';

interface Props {
  resourceName: string;
}

const StyledEmpty = styled.p`
  border: 1px solid var(--color-grey-300);
  padding: 1.5rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
`;

const Empty = ({ resourceName }: Props) => {
  return <StyledEmpty>No {resourceName} could be found.</StyledEmpty>;
};
export default Empty;

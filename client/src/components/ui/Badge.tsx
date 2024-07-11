import styled from 'styled-components';

interface Props {
  status?: string;
}

const Badge = styled.span<Props>`
  width: fit-content;
  height: fit-content;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.status?.toLowerCase()}-700);
  background-color: var(--color-${(props) => props.status?.toLowerCase()}-100);
`;

export default Badge;

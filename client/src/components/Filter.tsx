import styled from 'styled-components';
import { Option } from '../types/filter';

const StyledFilter = styled.div`
  display: flex;
  gap: 0.5rem;

  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);

  padding: 0.4rem;
`;

interface Props {
  options: Option[];
  render: (item: Option) => JSX.Element;
}

const Filter = ({ options, render }: Props) => {
  return <StyledFilter>{options.map(render)}</StyledFilter>;
};
export default Filter;

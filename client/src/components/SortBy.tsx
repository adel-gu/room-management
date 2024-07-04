import styled from 'styled-components';
import { Option } from '../types/filter';
import { useSearchParams } from 'react-router-dom';

interface Props {
  options: Option[];
  render: (item: Option) => JSX.Element;
}

const StyledSortBy = styled.select`
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  border: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
`;

const SortBy = ({ options, render }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <StyledSortBy onChange={handleOnChange} value={sortBy}>
      {options.map(render)}
    </StyledSortBy>
  );
};
export default SortBy;

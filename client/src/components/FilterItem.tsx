import styled, { css } from 'styled-components';
import { Option } from '../types/filter';
import { useSearchParams } from 'react-router-dom';

interface Props {
  item: Option;
  field: string;
}

interface StyledProps {
  active: 'true' | 'false';
}

const StyledFilterItem = styled.button<StyledProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);

  font-weight: 500;
  font-size: 1.4rem;

  padding: 0.44rem 0.8rem;
  transition: all 0.33s;

  ${(props) =>
    props.active === 'true' &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-brand-600);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const FilterItem = ({ item, field }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let currentFilter =
    field === 'last'
      ? searchParams.get(field) ?? '7'
      : searchParams.get(field) ?? 'all';

  const handleClick = () => {
    searchParams.set(field, `${item.value}`);

    setSearchParams(searchParams);
  };
  return (
    <StyledFilterItem
      onClick={handleClick}
      active={`${item.value === currentFilter}`}
    >
      {item.label}
    </StyledFilterItem>
  );
};
export default FilterItem;

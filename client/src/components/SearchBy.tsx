import styled from 'styled-components';
import Input from './ui/Input';
import Button from './ui/Button';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding-right: 0.6rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  font-size: 1.3rem;

  &:focus-within {
    outline: 2px solid var(--color-brand-700);
  }

  & > input {
    &,
    &:focus {
      padding: 0.5rem 0rem 0.5rem 0.8rem;
      border: none;
      outline: none;
      box-shadow: none;
    }
  }

  & > button {
    padding: 0rem 0rem;
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    background-color: var(--color-grey-300);

    &,
    &:focus,
    &:hover {
      outline: none;
    }

    &:hover {
      background-color: var(--color-grey-400);
    }

    & > svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const SearchBy = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchParams.set('search', e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const handleReset = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <form onReset={handleReset}>
      <StyledSearchBar>
        <Input
          type="text"
          id="search"
          placeholder="Search..."
          onChange={handleChange}
          autoComplete="off"
        />
        <Button type="reset">
          <X />
        </Button>
      </StyledSearchBar>
    </form>
  );
};
export default SearchBy;

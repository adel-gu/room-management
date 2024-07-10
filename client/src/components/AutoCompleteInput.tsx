import { useFormContext } from 'react-hook-form';
import Input from './ui/Input';
import { createContext, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useClickOut from '../hooks/utils/useClickOut';

export type Item = { id: string; name: string };

interface Props {
  name: string;
  items?: Item[];
  render: (item: Item) => JSX.Element;
  disable?: boolean;
}

export const AutoCompleteInputContext = createContext<{
  closeOption?: () => void;
}>({});

const StyledAutoCompleteInput = styled.div`
  position: relative;
`;

const StyledItemsList = styled.ul`
  border: 1px solid (--color-grey-300);
  border-radius: var(--border-radius-tiny);
  margin-top: 0.3rem;
  padding-inline: 0.3rem;
  background-color: var(--color-grey-0);

  box-shadow: var(--shadow-md);

  position: absolute;
  left: 0;
  right: 0;
  z-index: 101;

  & > :not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const EmptyItem = styled.li`
  color: var(--color-red-700);
  background-color: var(--color-red-100);
  padding: 1.5rem 1rem;
  margin-inline: -0.5rem;
  border-radius: var(--border-radius-tiny);
`;

const AutoCompleteInput = ({ name, items, render, disable }: Props) => {
  const { register } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const closeOption = () => {
    searchParams.delete(name);
    setSearchParams(searchParams);
    setIsOpen(false);
  };
  const ref = useClickOut(closeOption);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchParams.set(name, e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(name);
      setSearchParams(searchParams);
    }
  };

  return (
    <AutoCompleteInputContext.Provider value={{ closeOption }}>
      <StyledAutoCompleteInput ref={ref}>
        <Input
          type="text"
          id={name}
          {...register(`${name}-display`)}
          placeholder={`Search for ${name}...`}
          autoComplete="off"
          disabled={disable}
          onChange={handleChange}
          onMouseDown={() => setIsOpen(true)}
        />
        <input type="hidden" {...register(name)} />

        {isOpen && (
          <StyledItemsList>
            {items?.length === 0 ? (
              <EmptyItem>No item found!</EmptyItem>
            ) : (
              <>{items?.map(render)}</>
            )}
          </StyledItemsList>
        )}
      </StyledAutoCompleteInput>
    </AutoCompleteInputContext.Provider>
  );
};
export default AutoCompleteInput;

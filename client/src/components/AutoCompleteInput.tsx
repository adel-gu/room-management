import { useFormContext } from 'react-hook-form';
import Input from './ui/Input';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';

export type Item = { id: string; name: string };

interface Props {
  name: string;
  items?: Item[];
  render: (item: Item) => JSX.Element;
  disable?: boolean;
}

const StyledAutoCompleteInput = styled.div`
  position: relative;
`;

const StyledItemsList = styled.ul<{ danger?: string }>`
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-tiny);
  margin-top: 0.3rem;
  padding-inline: 0.3rem;
  background-color: ${(props) =>
    props.danger ? css`var(--color-red-100)` : css`var(--color-grey-0)`};

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
  padding: 1.5rem 1rem;
`;

const AutoCompleteInput = ({ name, items, render, disable }: Props) => {
  const { register } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchParams.set(name, e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(name);
      setSearchParams(searchParams);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
    searchParams.delete(name);
    setSearchParams(searchParams);
  };

  return (
    <StyledAutoCompleteInput>
      <Input
        type="text"
        id={name}
        {...register(`${name}-display`)}
        placeholder="Search"
        autoComplete="off"
        disabled={disable}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input type="hidden" {...register(name)} />
      {items?.length === 0 && (
        <StyledItemsList danger="danger">
          <EmptyItem>No item found!</EmptyItem>
        </StyledItemsList>
      )}
      {isOpen && items && (
        <StyledItemsList>{items?.map(render)}</StyledItemsList>
      )}
    </StyledAutoCompleteInput>
  );
};
export default AutoCompleteInput;

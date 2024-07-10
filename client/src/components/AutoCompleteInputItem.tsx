import { useFormContext } from 'react-hook-form';
import { AutoCompleteInputContext, Item } from './AutoCompleteInput';
import styled from 'styled-components';
import { useContext } from 'react';

interface Props {
  item: Item;
  name: string;
}

const StyledAutoCompleteItem = styled.li`
  color: var(--color-grey-500);
  padding: 0.5rem 0.2rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-50);
  }
`;

const AutoCompleteInputItem = ({ item, name }: Props) => {
  const { setValue } = useFormContext();
  const { closeOption } = useContext(AutoCompleteInputContext);

  const handleClick = () => {
    setValue(name, item.id);
    setValue(`${name}-display`, item.name);
    closeOption?.();
  };

  return (
    <StyledAutoCompleteItem onClick={handleClick}>
      {item.name}
    </StyledAutoCompleteItem>
  );
};
export default AutoCompleteInputItem;

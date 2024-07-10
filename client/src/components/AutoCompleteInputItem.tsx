import { useFormContext } from 'react-hook-form';
import { Item } from './AutoCompleteInput';
import styled from 'styled-components';

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

  return (
    <StyledAutoCompleteItem
      onClick={() => {
        setValue(name, item.id);
        setValue(`${name}-display`, item.name);
      }}
    >
      {item.name}
    </StyledAutoCompleteItem>
  );
};
export default AutoCompleteInputItem;

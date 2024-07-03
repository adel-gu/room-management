import Filter from './Filter';
import FilterItem from './FilterItem';
import { FilterObjType } from '../types/filter';
import styled from 'styled-components';

interface Props {
  filterObj: FilterObjType;
}

const StyledQueryOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6;
`;

const QueryOperations = ({ filterObj }: Props) => {
  return (
    <StyledQueryOperations>
      <Filter
        options={filterObj.options}
        render={(item) => (
          <FilterItem key={item.value} item={item} field={filterObj.field} />
        )}
      />
    </StyledQueryOperations>
  );
};
export default QueryOperations;

import Filter from './Filter';
import FilterItem from './FilterItem';
import { FilterObjType, SortByObjType } from '../types/filter';
import styled from 'styled-components';
import SortBy from './SortBy';
import SortByItem from './SortByItem';

interface Props {
  filterObj: FilterObjType;
  sortByObj: SortByObjType;
}

const StyledQueryOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6;
`;

const QueryOperations = ({ filterObj, sortByObj }: Props) => {
  return (
    <StyledQueryOperations>
      <Filter
        options={filterObj.options}
        render={(item) => (
          <FilterItem key={item.value} item={item} field={filterObj.field} />
        )}
      />

      <SortBy
        options={sortByObj}
        render={(item) => <SortByItem key={item.value} item={item} />}
      />
    </StyledQueryOperations>
  );
};
export default QueryOperations;

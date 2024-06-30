import styled from 'styled-components';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);

  padding: 1.2rem 2.4rem;

  & > * {
    display: flex;
    align-items: center;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export default TableRow;

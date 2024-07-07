import { createContext, FC, HtmlHTMLAttributes, useContext } from 'react';
import styled from 'styled-components';
/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */

interface ITable extends HtmlHTMLAttributes<HTMLDivElement> {
  columns: string;
}
interface ITableHeader extends HtmlHTMLAttributes<HTMLDivElement> {}
interface ITableBody extends HtmlHTMLAttributes<HTMLElement> {}
interface ITableRow extends HtmlHTMLAttributes<HTMLDivElement> {}

/* -------------------------------------------------------------------------- */
/*                                   CONTEXT                                  */
/* -------------------------------------------------------------------------- */

type TableContextType = {
  columns?: string;
};

const TableContext = createContext<TableContextType>({});

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */
const StyledGrid = styled.div<ITable>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
`;

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;

  box-shadow: var(--shadow-md);
`;

const StyledHeader = styled(StyledGrid)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(StyledGrid)`
  padding: 1.2rem 2.4rem;
  & > * {
    display: flex;
    align-items: center;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TableFooter = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const Table: FC<ITable> = ({ children, columns }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const TableHeader: FC<ITableHeader> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return <StyledHeader columns={columns ?? ''}>{children}</StyledHeader>;
};

const TableBody: FC<ITableBody> = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

const TableRow: FC<ITableRow> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return <StyledRow columns={columns ?? ''}>{children}</StyledRow>;
};

export default Object.assign(Table, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Footer: TableFooter,
});

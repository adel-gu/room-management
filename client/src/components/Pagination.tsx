import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  pages?: number;
  page?: number;
  pageSize?: number;
  total?: number;
}

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & > span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const ControlButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  /* background-color: ;
  color:; */
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & > svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ pages = 1, page = 1, total = 0 }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nextPage = () => {
    const next = page < pages ? page + 1 : page;
    searchParams.set('page', next.toString());
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = page > 1 ? page - 1 : page;
    searchParams.set('page', prev.toString());
    setSearchParams(searchParams);
  };

  return (
    <StyledPagination>
      <P>
        Showing <span>{page}</span> to <span>{pages}</span> of{' '}
        <span>{total}</span> results
      </P>
      <Buttons>
        <ControlButton onClick={prevPage} disabled={page === 1}>
          Previous
        </ControlButton>
        <ControlButton onClick={nextPage} disabled={page === pages}>
          Next
        </ControlButton>
      </Buttons>
    </StyledPagination>
  );
};
export default Pagination;

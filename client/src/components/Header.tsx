import styled from 'styled-components';
import Avatar from './ui/Avatar';
import HeaderMenu from './ui/HeaderMenu';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem 3rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Avatar />
      <HeaderMenu />
    </StyledHeader>
  );
};
export default Header;

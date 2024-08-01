import styled from 'styled-components';
import { Hotel } from 'lucide-react';

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > svg {
    width: 5rem;
    height: 5rem;
    color: var(--color-brand-500);
  }

  & > p {
    font-weight: 600;
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <Hotel />
      <p>Room Manager</p>
    </StyledLogo>
  );
};
export default Logo;

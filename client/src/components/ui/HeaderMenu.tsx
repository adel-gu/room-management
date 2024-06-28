import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

import ButtonIcon from './ButtonIcon';
import DarkMode from './DarkMode';
import Logout from './Logout';
import styled from 'styled-components';

const HeaderMenuList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <HeaderMenuList>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <User />
        </ButtonIcon>
      </li>
      <li>
        <DarkMode />
      </li>
      <li>
        <Logout />
      </li>
    </HeaderMenuList>
  );
};
export default HeaderMenu;

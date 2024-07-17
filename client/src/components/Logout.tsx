import { LogOut } from 'lucide-react';
import ButtonIcon from './ui/ButtonIcon';
import { useLogout } from '../hooks/auth';
import Spinner from './Spinner';

const Logout = () => {
  const { logout, isLogoutLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLogoutLoading} onClick={() => logout()}>
      {!isLogoutLoading ? <LogOut /> : <Spinner size="sm" />}
    </ButtonIcon>
  );
};
export default Logout;

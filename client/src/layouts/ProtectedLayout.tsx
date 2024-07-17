import { useEffect } from 'react';
import { useValidateAuth } from '../hooks/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../components/Spinner';

interface Props {
  children: React.ReactNode;
}

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isAuthenticated, isAuthLoading } = useValidateAuth();

  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) navigate('/login');
  }, [isAuthenticated, isAuthLoading]);

  if (isAuthLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
};
export default ProtectedLayout;

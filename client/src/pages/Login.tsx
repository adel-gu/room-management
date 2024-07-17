import styled from 'styled-components';
import Heading from '../components/ui/Heading';
import LoginForm from '../components/Auth/LoginForm';

const StyledLogin = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  return (
    <StyledLogin>
      <Heading as="h4">Log in to your account</Heading>

      <LoginForm />
    </StyledLogin>
  );
};
export default Login;

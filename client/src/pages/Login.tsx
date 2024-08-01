import { Link } from 'react-router-dom';
import Heading from '../components/ui/Heading';
import LoginRegisterContainer from '../components/ui/LoginRegisterContainer';
import LoginForm from '../components/Auth/LoginForm';
import Logo from '../components/ui/Logo';

const Login = () => {
  return (
    <LoginRegisterContainer>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>

      <LoginForm />

      <span>
        Don't have an account? <Link to="/register">Register here</Link>
      </span>
    </LoginRegisterContainer>
  );
};
export default Login;

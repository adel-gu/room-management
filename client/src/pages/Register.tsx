import { Link } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import Heading from '../components/ui/Heading';
import LoginRegisterContainer from '../components/ui/LoginRegisterContainer';
import Logo from '../components/ui/Logo';

const Register = () => {
  return (
    <LoginRegisterContainer>
      <Logo />
      <Heading as="h4">Register a new account</Heading>

      <RegisterForm />

      <span>
        You already have an account? <Link to="/login">Login here</Link>
      </span>
    </LoginRegisterContainer>
  );
};
export default Register;

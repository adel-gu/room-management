import { Link } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import Heading from '../components/ui/Heading';
import LoginRegisterContainer from '../components/ui/LoginRegisterContainer';

const Register = () => {
  return (
    <LoginRegisterContainer>
      <Heading as="h4">Register a new account</Heading>

      <RegisterForm />

      <span>
        You already have an account? <Link to="/login">Login</Link>
      </span>
    </LoginRegisterContainer>
  );
};
export default Register;

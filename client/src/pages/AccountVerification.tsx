import styled from 'styled-components';
import Heading from '../components/ui/Heading';
import { MailCheck } from 'lucide-react';
import VerificationForm from '../components/Auth/VerificationForm';

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & > svg {
    width: 6rem;
    height: 6rem;
    color: var(--color-brand-700);
  }
`;

const AccountVerification = () => {
  return (
    <Container>
      <WelcomeMessage>
        <MailCheck />
        <Heading as="h2" primary={true}>
          We've sent a verification email
        </Heading>
        <p>Check the code sent to your email to verify your account.</p>
      </WelcomeMessage>
      <VerificationForm />
    </Container>
  );
};
export default AccountVerification;

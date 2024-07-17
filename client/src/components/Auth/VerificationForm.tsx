import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { verificationFormSchema, verificationData } from '../../types/Admin';

import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FormRowVertical from '../FormRowVertical';
import Spinner from '../Spinner';
import SpinnerContainer from '../ui/SpinnerContainer';
import { useVerifyAccount } from '../../hooks/auth';

const VerificationForm = () => {
  const form = useForm<verificationData>({
    resolver: zodResolver(verificationFormSchema),
  });

  const { verifyAccount, isVerifyingLoading } = useVerifyAccount();

  const onSubmit = (data: verificationData) => {
    verifyAccount(data);
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRowVertical id="token" label="Token">
          <Input
            type="text"
            id="token"
            {...form.register('token')}
            disabled={isVerifyingLoading}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button size="lg" disabled={isVerifyingLoading}>
            {!isVerifyingLoading ? (
              'Verify'
            ) : (
              <SpinnerContainer>
                <Spinner size="sm" color="secondary" />
              </SpinnerContainer>
            )}
          </Button>
        </FormRowVertical>
      </Form>
    </FormProvider>
  );
};
export default VerificationForm;

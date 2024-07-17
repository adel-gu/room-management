import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '../../hooks/auth';
import { loginFormSchema, LoginData } from '../../types/Admin';

import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FormRowVertical from '../FormRowVertical';
import Spinner from '../Spinner';
import SpinnerContainer from '../ui/SpinnerContainer';

const LoginForm = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });
  const { login, isLoginLoading } = useLogin();

  const onSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRowVertical id="email" label="Email">
          <Input
            type="email"
            id="email"
            {...form.register('email')}
            disabled={isLoginLoading}
          />
        </FormRowVertical>

        <FormRowVertical id="password" label="Password">
          <Input
            type="password"
            id="password"
            {...form.register('password')}
            disabled={isLoginLoading}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button size="lg" disabled={isLoginLoading}>
            {!isLoginLoading ? (
              'Log in'
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
export default LoginForm;

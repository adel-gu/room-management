import { FormProvider, useForm } from 'react-hook-form';

import Form from '../ui/Form';
import Input from '../ui/Input';
import FormRowVertical from '../FormRowVertical';
import Spinner from '../Spinner';
import Button from '../ui/Button';
import { formSchema, LoginData } from '../../types/Admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/auth';
import styled from 'styled-components';

const StyledSpinnerContainer = styled.div`
  width: fit-content;
  margin-inline: auto;
`;

const LoginForm = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'coco@gamil.com',
      password: '12345678',
    },
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
              <StyledSpinnerContainer>
                <Spinner size="sm" color="secondary" />
              </StyledSpinnerContainer>
            )}
          </Button>
        </FormRowVertical>
      </Form>
    </FormProvider>
  );
};
export default LoginForm;

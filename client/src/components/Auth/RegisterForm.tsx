import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegister } from '../../hooks/auth';
import { registerFormSchema, registerData } from '../../types/Admin';

import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FormRowVertical from '../FormRowVertical';
import Spinner from '../Spinner';
import SpinnerContainer from '../ui/SpinnerContainer';

const RegisterForm = () => {
  const form = useForm<registerData>({
    resolver: zodResolver(registerFormSchema),
  });
  const { register, isRegisterLoading } = useRegister();

  const onSubmit = (data: registerData) => {
    register(data);
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRowVertical id="name" label="Full name">
          <Input
            type="text"
            id="name"
            {...form.register('name')}
            disabled={isRegisterLoading}
          />
        </FormRowVertical>

        <FormRowVertical id="email" label="Email">
          <Input
            type="email"
            id="email"
            {...form.register('email')}
            disabled={isRegisterLoading}
          />
        </FormRowVertical>

        <FormRowVertical id="password" label="Password">
          <Input
            type="password"
            id="password"
            {...form.register('password')}
            disabled={isRegisterLoading}
          />
        </FormRowVertical>

        <FormRowVertical id="passwordConfirm" label="Password confirmation">
          <Input
            type="password"
            id="passwordConfirm"
            {...form.register('passwordConfirm')}
            disabled={isRegisterLoading}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button size="lg" disabled={isRegisterLoading}>
            {!isRegisterLoading ? (
              'Register'
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
export default RegisterForm;

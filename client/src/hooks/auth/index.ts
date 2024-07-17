import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginRequest } from '../../api/auth';

export const useLogin = () => {
  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginRequest,
    onSuccess: () => toast.success('Admin logged in successfully'),
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoginLoading };
};

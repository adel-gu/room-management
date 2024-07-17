import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginRequest, validateAuthRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginRequest,
    onSuccess: async () => {
      toast.success('Admin logged in successfully');
      await queryClient.invalidateQueries({ queryKey: ['validateAuth'] });
      navigate('/');
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoginLoading };
};

export const useValidateAuth = () => {
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useQuery({
    queryKey: ['validateAuth'],
    queryFn: () => validateAuthRequest(),
  });

  return {
    isAuthenticated,
    isAuthLoading,
  };
};

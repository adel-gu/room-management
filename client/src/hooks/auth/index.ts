import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  loginRequest,
  logoutRequest,
  validateAuthRequest,
  registerRequest,
} from '../../api/auth';
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

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLogoutLoading } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutRequest,
    onSuccess: () => {
      toast.success('Admin logged out successfully');
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { logout, isLogoutLoading };
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: register, isPending: isRegisterLoading } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerRequest,
    onSuccess: async () => {
      toast.success('Admin registered successfully');
      await queryClient.invalidateQueries({ queryKey: ['validateAuth'] });
      navigate('/verification');
    },
    onError: (err) => toast.error(err.message),
  });

  return { register, isRegisterLoading };
};

export const useValidateAuth = () => {
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useQuery({
    queryKey: ['validateAuth'],
    queryFn: () => validateAuthRequest(),
    retry: false,
  });

  return {
    isAuthenticated,
    isAuthLoading,
  };
};

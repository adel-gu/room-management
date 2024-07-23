import { useQuery } from '@tanstack/react-query';
import { getCurrentAdminRequest } from '../../api/admins';
import toast from 'react-hot-toast';
import { IAdmin } from '../../types/Admin';


export const useGetCurrentAdmin = () => {
    const {
      data: admin,
      isLoading: isAdminLoading,
      error,
    } = useQuery<IAdmin, Error>({
      queryKey: ['getCurrentAdmin'],
      queryFn: getCurrentAdminRequest
    });
  
    if (error) toast.error(error.message);
  
    return {
      admin,
      isAdminLoading,
    };
  };

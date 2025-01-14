import { useUserStore } from '@/store/user';
import { UserRole } from '@/types/user';

export const checkOwner = (targetRole = '') => {
  const userRole = targetRole || useUserStore.getState().user?.role;

  return userRole === UserRole.owner;
};

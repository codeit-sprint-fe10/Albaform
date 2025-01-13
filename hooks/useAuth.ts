import { useCallback } from 'react';
import { User } from '@/types/user';
import { useUserStore } from '@/store/user';
import { postSignUp, postSignIn } from '@/services/auth';
import { FEInstance } from '@/services/axiosInstance';

type SignUpParameters = Pick<User, 'email' | 'password' | 'name' | 'role'>;
type SignInParameters = Pick<User, 'email' | 'password'>;

export const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);

  const signUp = useCallback(async (params: SignUpParameters) => {
    await postSignUp(params);
  }, []);

  const signIn = useCallback(
    async (params: SignInParameters) => {
      const data = await postSignIn(params);
      const body = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userRole: data.user.role,
      };
      await FEInstance.post('/api/auth', body);
      setUser(data.user);
    },
    [setUser],
  );

  const signOut = useCallback(async () => {
    await FEInstance.delete('/api/auth');
    setUser(null);
  }, [setUser]);

  return { signUp, signIn, signOut };
};

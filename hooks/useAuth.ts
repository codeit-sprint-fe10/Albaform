import { useCallback } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { useUserStore } from '@/store/user';
import { postSignUp, postSignIn } from '@/services/auth';

type SignUpParameters = Pick<User, 'email' | 'password' | 'role'>;
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
      await axios.post('/api/auth', body);
      setUser(data.user);
    },
    [setUser],
  );

  const signOut = useCallback(async () => {
    await axios.delete('/api/auth');
    setUser(null);
  }, [setUser]);

  return { signUp, signIn, signOut };
};

'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { getMe } from '@/services/user';

const UserProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      await getMe()
        .then((user) => setUser(user))
        .catch(() => setUser(null));
    };

    checkUser();
  }, [setUser]);

  return <>{children}</>;
};

export default UserProvider;

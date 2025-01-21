'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/user';
import { postCookies } from '@/services/cookie';
import { postOauthSignIn } from '@/services/auth';
import { OAUTH_REDIRECT_URI } from '@/constants/api';
import Loader from '@/components/Loader';

const OauthPage = () => {
  const provider = useParams()['provider'] as string;
  const token = useSearchParams().get('code');
  const userRole = useSearchParams().get('state');
  const setUser = useUserStore()['setUser'];
  const { replace } = useRouter();

  useEffect(() => {
    if (!token) {
      toast.error('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
      replace('/');
    } else {
      postOauthSignIn(provider, { redirectUri: OAUTH_REDIRECT_URI, token })
        .then(async (data) => {
          const body = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            userRole: data.user.role,
          };
          await postCookies(body);
          setUser(data.user);

          toast.success('로그인되었습니다!\n즐거운 알바폼 되세요.');
          replace(document.location.pathname);
        })
        .catch((error: AxiosError<{ message: string }>) => {
          if (error.response?.data.message === '등록되지 않은 사용자입니다.') {
            toast.success('추가 정보 입력 페이지로 이동합니다!');
            replace(`/oauth/signup/${userRole}/${provider}?token=${token}`);
          }

          toast.error('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
          replace('/');
        });
    }
  }, [provider, userRole, token, setUser, replace]);

  return <Loader />;
};

export default OauthPage;

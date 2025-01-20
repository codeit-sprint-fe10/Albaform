import { UserRoleLowerCase } from '@/types/user';
import OauthSignUpHeadSection from './_components/OauthSignUpHeadSection';
import OauthSignUpFormSection from './_components/OauthSignUpFormSection';

interface OauthSignUpPageProps {
  params: Promise<{
    userRole: UserRoleLowerCase;
    provider: 'google' | 'kakao';
  }>;
  searchParams: Promise<{ token: string }>;
}

const OauthSignUpPage = async ({
  params,
  searchParams,
}: OauthSignUpPageProps) => {
  const { userRole, provider } = await params;
  const { token } = await searchParams;

  return (
    <>
      <OauthSignUpHeadSection userRole={userRole} />
      <OauthSignUpFormSection
        userRole={userRole}
        provider={provider}
        token={token}
      />
    </>
  );
};

export default OauthSignUpPage;

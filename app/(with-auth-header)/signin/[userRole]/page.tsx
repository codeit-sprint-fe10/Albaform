import { UserRoleLowerCase } from '@/types/user';
import SignInHeadSection from './_components/SignInHeadSection';
import SignInFormSection from './_components/SignInFormSection';
import SocialSection from '../../_components/SocialSection';

interface SignInPageProps {
  params: Promise<{ userRole: UserRoleLowerCase }>;
}

const SignInPage = async ({ params }: SignInPageProps) => {
  const { userRole } = await params;
  return (
    <>
      <SignInHeadSection userRole={userRole} />
      <SignInFormSection />
      <SocialSection userRole={userRole} type="로그인" />
    </>
  );
};

export default SignInPage;

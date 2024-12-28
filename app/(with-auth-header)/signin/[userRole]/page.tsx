import { UserRoleLowerCase } from '@/types/user';
import SignInHeadSection from './_components/SignInHeadSection';
import SignInFormSection from './_components/SignInFormSection';
import SocialSignInSection from './_components/SocialSignInSection';

interface SignInPageProps {
  params: Promise<{ userRole: UserRoleLowerCase }>;
}

const SignInPage = async ({ params }: SignInPageProps) => {
  const { userRole } = await params;
  return (
    <>
      <SignInHeadSection userRole={userRole} />
      <SignInFormSection />
      <SocialSignInSection />
    </>
  );
};

export default SignInPage;

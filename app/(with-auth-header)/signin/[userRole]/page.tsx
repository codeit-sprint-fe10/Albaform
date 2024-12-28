import SignInHeadSection from './_components/SignInHeadSection';
import SignInFormSection from './_components/SignInFormSection';
import SocialSignInSection from './_components/SocialSignInSection';
import { UserRoleLow } from '@/types/user';

interface SignInPageProps {
  params: Promise<{ userRole: UserRoleLow }>;
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

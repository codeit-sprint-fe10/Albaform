'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { UserRoleLow } from '@/types/user';
import SignUpHeadSection from './_components/SignUpHeadSection';
import SignUpFormSection from './_components/SignUpFormSection';
import SocialSignUpSection from './_components/SocialSignUpSection';
import InformationHeadSection from './_components/InformationHeadSection';
import InformationFormSection from './_components/InformationFormSection';

const SignUpPage = () => {
  const { userRole } = useParams();
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSignUpFormSubmit = () => {
    setIsSignUp(false);
  };

  return isSignUp ? (
    <>
      <SignUpHeadSection userRole={userRole as UserRoleLow} />
      <SignUpFormSection
        userRole={userRole as UserRoleLow}
        onSubmit={handleSignUpFormSubmit}
      />
      <SocialSignUpSection />
    </>
  ) : (
    <>
      <InformationHeadSection />
      <InformationFormSection userRole={userRole as UserRoleLow} />
    </>
  );
};

export default SignUpPage;

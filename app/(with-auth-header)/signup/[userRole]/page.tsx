'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { UserRoleLowerCase } from '@/types/user';
import SignUpHeadSection from './_components/SignUpHeadSection';
import SignUpFormSection from './_components/SignUpFormSection';
import SocialSection from '../../_components/SocialSection';
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
      <SignUpHeadSection userRole={userRole as UserRoleLowerCase} />
      <SignUpFormSection
        userRole={userRole as UserRoleLowerCase}
        onSubmit={handleSignUpFormSubmit}
      />
      <SocialSection type="회원가입" />
    </>
  ) : (
    <>
      <InformationHeadSection />
      <InformationFormSection userRole={userRole as UserRoleLowerCase} />
    </>
  );
};

export default SignUpPage;

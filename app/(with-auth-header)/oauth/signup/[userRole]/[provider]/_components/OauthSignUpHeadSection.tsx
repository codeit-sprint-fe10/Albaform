import RoleNav from '@/components/RoleNav';
import { UserRoleLowerCase } from '@/types/user';

interface OauthSignUpHeadSectionProps {
  userRole: UserRoleLowerCase;
}

const OauthSignUpHeadSection = ({ userRole }: OauthSignUpHeadSectionProps) => {
  const otherRole = userRole === 'applicant' ? '사장님' : '지원자';

  return (
    <section className="flex flex-col items-center text-center">
      <RoleNav isHeader={false} />
      <h1 className="mt-10 md:mt-0 mb-4 md:mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold">
        간편 회원가입
      </h1>
      <p className="text-xs md:text-md lg:text-xl text-black-100">
        추가 정보를 입력하여 회원가입을 완료해주세요.
        <br />
        {`${otherRole} 회원가입은 ${otherRole} 전용 페이지에서 할 수 있습니다.`}
      </p>
    </section>
  );
};

export default OauthSignUpHeadSection;

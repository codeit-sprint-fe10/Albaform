import Link from 'next/link';
import Image from 'next/image';
import RoleNav from './RoleNav';

const AuthHeader = () => {
  return (
    <header>
      <Link href="/" replace>
        <Image src="/icons/logo.svg" width={0} height={0} alt="알바폼 로고" />
        <Image
          src="/icons/albaform.svg"
          width={0}
          height={0}
          alt="albaform text logo"
        />
      </Link>
      <RoleNav isHeader={true} />
    </header>
  );
};

export default AuthHeader;

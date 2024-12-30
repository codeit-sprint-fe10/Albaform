'use client';

import Applications from '@/app/(with-main-header)/alba/[formId]/_components/Applications';
import OwnerActions from '@/app/(with-main-header)/alba/[formId]/_components/OwnerActions';
import { useUserStore } from '@/store/user';
import { UserRole } from '@/types/user';

type OwnerSectionProps = { formId: number };

const OwnerSection = ({ formId }: OwnerSectionProps) => {
  const user = useUserStore((state) => state.user);

  // TODO: 추가적으로 owner 본인 알바공고 인지 확인 필요
  if (!user || user.role !== UserRole.owner) {
    return null;
  }

  return (
    <>
      <section className="relative mt-10 before:content-[''] before:absolute before:-mx-4 before:w-screen before:-ml-[calc((100vw-100%)/2)] before:h-2 before:bg-line-100">
        <Applications formId={formId} />
      </section>
      <section className="py-4">
        <OwnerActions formId={formId} />
      </section>
    </>
  );
};

export default OwnerSection;

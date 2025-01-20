import FormNavigator from '@/app/(with-main-header)/addform/_components/FormNavigator';
import WithFormIdValidation from '@/components/WithFormIdValidation';
import { getAlbaDetail } from '@/services/alba';
import { getMe } from '@/services/user';
import { filterToPostAlbaBody } from '@/utils/filter';
import { notFound } from 'next/navigation';

const EditFormPage = async ({ formId }: { formId: number }) => {
  const albaDetail = await getAlbaDetail(formId);
  const user = await getMe();

  if (albaDetail.ownerId !== user.id) {
    notFound();
  }

  return (
    <>
      <FormNavigator
        formId={formId}
        albaDetail={filterToPostAlbaBody(albaDetail)}
      />
    </>
  );
};

export default WithFormIdValidation(EditFormPage);

import FormNavigator from '@/app/(with-main-header)/addform/_components/FormNavigator';
import { getAlbaDetail } from '@/services/alba';
import { getMe } from '@/services/user';
import { filterToPostAlbaBody } from '@/utils/filter';
import { notFound } from 'next/navigation';

const EditFormPage = async ({
  params,
}: {
  params: Promise<{ formId: number }>;
}) => {
  const { formId } = await params;
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

export default EditFormPage;

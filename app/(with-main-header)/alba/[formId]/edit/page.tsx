import FormNavigator from '@/app/(with-main-header)/addform/_components/FormNavigator';
import { getAlbaDetail } from '@/services/alba';
import { filterToPostAlbaBody } from '@/utils/filter';

const EditFormPage = async ({
  params,
}: {
  params: Promise<{ formId: number }>;
}) => {
  const { formId } = await params;
  const albaDetail = await getAlbaDetail(formId);
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

import FormNavigator from '@/app/(with-main-header)/addform/_components/FormNavigator';

const EditFormPage = async ({
  params,
}: {
  params: Promise<{ formId: number }>;
}) => {
  const { formId } = await params;
  return (
    <>
      <FormNavigator formId={formId} />
    </>
  );
};

export default EditFormPage;

const MyApplyPage = async ({
  params,
}: {
  params: Promise<{ formId: number }>;
}) => {
  const { formId } = await params;

  return <div>{formId}</div>;
};

export default MyApplyPage;

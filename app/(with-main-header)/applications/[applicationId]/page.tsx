const ApplicationsPage = async ({
  params,
}: {
  params: Promise<{ applicationId: number }>;
}) => {
  const { applicationId } = await params;
  console.log(applicationId);

  return <div>{applicationId}</div>;
};

export default ApplicationsPage;

import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

const WithFormIdValidation = (
  Component: (props: { formId: number }) => Promise<ReactNode>,
) => {
  const WrappedComponent = async ({
    params,
  }: {
    params: Promise<{ formId: number }>;
  }) => {
    const { formId } = await params;

    if (isNaN(formId) || formId <= 0) {
      notFound();
    }

    return await Component({ formId });
  };

  return WrappedComponent;
};

export default WithFormIdValidation;

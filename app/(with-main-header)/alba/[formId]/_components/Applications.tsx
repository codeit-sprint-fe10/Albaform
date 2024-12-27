import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetApplicationsResponse } from '@/types/application';
import { useState } from 'react';

type ApplicationsProps = {
  id: number;
};

const PAGE_LIMIT = 5;

const Applications = ({ id }: ApplicationsProps) => {
  return (
    <section>
      <h3>지원 현황</h3>
    </section>
  );
};

export default Applications;

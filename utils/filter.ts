import { PostAlbaBody, PostAlbaResponse } from '@/types/alba';

export const filterToPostAlbaBody = (
  response: PostAlbaResponse,
): Partial<PostAlbaBody> => {
  const allowedKeys: (keyof PostAlbaBody)[] = [
    'title',
    'description',
    'recruitmentEndDate',
    'recruitmentStartDate',
    'imageUrls',
    'numberOfPositions',
    'gender',
    'education',
    'age',
    'preferred',
    'location',
    'workStartTime',
    'workEndTime',
    'hourlyWage',
    'isNegotiableWorkDays',
    'isPublic',
    'workDays',
    'workEndDate',
    'workStartDate',
  ];

  const filteredData = allowedKeys.reduce((acc, key) => {
    if (key in response) {
      (acc as Record<string, unknown>)[key] = response[key];
    }
    return acc;
  }, {} as Partial<PostAlbaBody>);

  return filteredData;
};

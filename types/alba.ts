import { PostFormBody } from '@/types/form';

export interface Alba extends PostFormBody {
  updatedAt: string;
  createdAt: string;
  workEndDate: string;
  workStartDate: string;
  imageUrls: string[]; // TODO imageUrl이 null일경우 처리후 제거
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  ownerId: number;
  id: number;
  scrapCount: number;
  applyCount: number;
  isScrapped: boolean;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
}

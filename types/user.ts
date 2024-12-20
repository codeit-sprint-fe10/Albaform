export enum UserRole {
  APPLICANT = 'APPLICANT',
  OWNER = 'OWNER',
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string | 'undefined';
  imageUrl: string | null;
  role: UserRole;
  storeName: string | 'undefined';
  storePhoneNumber: string | 'undefined';
  location: string | 'undefined';
}

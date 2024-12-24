export enum UserRole {
  APPLICANT = 'APPLICANT',
  OWNER = 'OWNER',
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string | null;
  phoneNumber: string | null;
  imageUrl: string | null;
  role: UserRole;
  storeName: string | null;
  storePhoneNumber: string | null;
  location: string | null;
}

export type GetMeResponse = Omit<User, 'password'>;

export type PatchMeBody = Partial<
  Omit<User, 'id' | 'email' | 'password' | 'role'>
>;

export type PatchMeResponse = Omit<User, 'password'>;

export interface PatchPasswordBody {
  currentPassword: string;
  newPassword: string;
}

export interface PatchPasswordResponse {
  message: string;
}

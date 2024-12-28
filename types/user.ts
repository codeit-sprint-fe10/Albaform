export const UserRole = {
  applicant: 'APPLICANT',
  owner: 'OWNER',
} as const;

export type UserRoleUp = (typeof UserRole)[keyof typeof UserRole];

export type UserRoleLow = keyof typeof UserRole;

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string | null;
  phoneNumber: string | null;
  imageUrl: string | null;
  role: UserRoleUp;
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

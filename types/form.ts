import { User } from './user';
import { Alba } from './alba';
import { Application } from './application';

type Field = User &
  Alba &
  Application & {
    currentPassword: string;
    newPassword: string;
    passwordConfirmation: string;
  };

export type FieldName = keyof Field;
export type CommonFieldName = keyof Omit<Field, CustomFieldName>;
export type CustomFieldName =
  | 'imageUrl'
  | 'location'
  | 'resumeId'
  | 'resumeName';

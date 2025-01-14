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
type CommonField = Omit<Field, 'location' | 'resumeId' | 'resumeName'>;
type CustomField = Pick<Field, 'location' | 'resumeId' | 'resumeName'>;

export type FieldName = keyof Field;
export type CommonFieldName = keyof CommonField;
export type CustomFieldName = keyof CustomField;

import { User } from './user';
import { Alba } from './alba';
import { Application } from './application';

export type Field = User & Alba & Application;

export type FieldName = keyof Field;

export type CommonFieldName = keyof Omit<
  Field,
  'location' | 'resumeId' | 'resumeName'
>;

export type CustomFieldName = keyof Pick<
  Field,
  'location' | 'resumeId' | 'resumeName'
>;

export type CustomSetValue<N extends FieldName> = (
  name: N,
  value: string,
  options?: { shouldDirty: boolean },
) => void;

export type CustomSetError<N extends FieldName> = (
  name: N,
  error: { type: string; message: string },
) => void;

export type CustomClearErrors<N extends FieldName> = (name: N) => void;

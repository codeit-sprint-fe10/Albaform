import { v4 as uuidv4 } from 'uuid';

export const renameImageFile = (file: File) => {
  const fileExtension = file.name.includes('.')
    ? file.name.split('.').pop()
    : '';
  const newFileName = `${uuidv4()}.${fileExtension}`;
  const renamedFile = new File([file], newFileName, { type: file.type });
  return renamedFile;
};

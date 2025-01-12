import { AxiosError } from 'axios';

export const printError = (error: AxiosError<{ message: string }>) => {
  const response = error.response;
  if (response) {
    console.log(
      `[${error.status}:${response.config.url}] ${response.data.message}`,
    );
  } else console.log(`[${error.code}] ${error.message}`);
};

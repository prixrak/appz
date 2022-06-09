import { AxiosError } from 'axios';
import { ErrorInfo } from './../interfaces/ErrorInfo';

export const getErrorInfo = (error: AxiosError): ErrorInfo => {
  const err = error as AxiosError;
  const errorMessage: string = err.response?.data.message;
  const errorCode = err.response?.status;
  return { code: errorCode, message: errorMessage };
};

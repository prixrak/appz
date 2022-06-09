import { DataState } from '../enums/DataState';
import { ErrorInfo } from './ErrorInfo';

export interface AsyncData<T> {
  data: T | null;
  state: DataState;
  error?: ErrorInfo;
}

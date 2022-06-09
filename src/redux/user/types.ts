import { AsyncData } from '../../interfaces/AsyncData';
import { User } from '../../interfaces/User';

export interface State {
  currentUser: AsyncData<User>;
}

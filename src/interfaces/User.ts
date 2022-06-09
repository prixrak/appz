import { Role } from '../enums/Role';

export interface User {
  name?: string;
  email: string;
  role: Role;
  iat: string;
  exp: string;
}

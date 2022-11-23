export interface Address {
  id?: number;
  guardId?: number;
  apartment: number;
  city: string;
  country: string;
  house: number;
  street: string;
}

export interface Guard {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: Address;
  isMarried: boolean;
  didWorkedAsSecurityGuard: boolean;
  weight: number;
}

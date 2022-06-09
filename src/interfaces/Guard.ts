export interface Guard {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    apartment: number;
    city: string;
    country: string;
    house: number;
    street: string;
  };
}

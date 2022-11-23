interface idName {
  id: number;
  name: string;
}

export interface AddressesData {
  countries: idName[];
  cities: idName[];
  streets: idName[];
}

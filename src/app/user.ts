export class User {
  id: 0;
  name: string;
  username: string;
  email: string;
  address: Address = new Address();
  phone: string;
  website: string;
}

export class Address {
  zipcode: string;
  city: string;
  street: string;
  suite: string;
}

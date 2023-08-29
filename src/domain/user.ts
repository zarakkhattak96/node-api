export interface userData {
  id?: string;
  name: string;
  password: string;
  email: string;
  phone: number;
  address: string;
  createdAt?: Date;
}

export abstract class UserRepository {
  abstract registerUser(userObject: userData): Promise<userData>;
  abstract fetchAllUsers(): Promise<userData[] | null>;
  abstract deleteUser(userObject: userData): Promise<userData>;
  abstract updateUser(userObject: userData): Promise<userData>;
}

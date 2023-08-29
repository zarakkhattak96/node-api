// user entity

export interface User {
	name: string;
	password: string;
	email: string;
	phone: number;
	address: string;
	createdAt?: Date;
}

export abstract class UserRepository {
	abstract insert(user: User): Promise<User>;
	abstract fetch(id: string): Promise<User | null>;
	abstract delete(id: string): Promise<User>;
	abstract update(user: User): Promise<User>;
	abstract fetchAll(): Promise<User[]>;

	//  abstract delete(user:User): Promise<User>
}

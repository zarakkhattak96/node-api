import { userEntity } from "../../../../domain/entities/user.entity";
import { UserTypeWithId } from "../../../../application/dtos/crudUser.dto";

export interface UserRepoInterface {
  registerUser(userObject: userEntity): Promise<UserTypeWithId>;
  deleteUser(userObject: userEntity): Promise<UserTypeWithId>;
  updateUser(userObject: userEntity): Promise<UserTypeWithId>;
  getAllUsers(): Promise<UserTypeWithId[] | null>;
}

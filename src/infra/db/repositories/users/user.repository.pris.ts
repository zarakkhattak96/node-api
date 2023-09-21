import { userEntity } from "../../../../domain/entities/user.entity";
// import { UserPort } from "../../../../domain/repositories/user.port";
import { prisma } from "../../conn";
import { UserRepoInterface } from "./user.repo.interface";

// fetching user data
export class UserRepositoryPrisma implements UserRepoInterface {
  getAllUsers = async () => {
    const allUsers = await prisma.userData.findMany();
    return allUsers;
  };

  // creating User
  registerUser = async ({
    name,
    email,
    password,
    address,
    phone,
  }: userEntity) => {
    const userObject = { name, email, password, address, phone };
    const newUser = await prisma.userData.create({
      data: userObject,
    });
    return newUser;
  };

  deleteUser = async (userObject: userEntity) => {
    const user = await prisma.userData.delete({
      where: {
        email: userObject.email,
      },
    });
    if (user === null) throw new Error("User not defined");
    return user;
  };

  updateUser = async (dataUpdate: userEntity) => {
    const userUpdated = await prisma.userData.update({
      where: {
        email: dataUpdate.email,
      },
      data: dataUpdate,
    });
    return userUpdated;
  };
}

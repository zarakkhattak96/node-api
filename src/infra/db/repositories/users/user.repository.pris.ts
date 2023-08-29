import { Types } from "@prisma/client/runtime/library";
import { userData, UserRepository } from "../../../../domain/user";
import { prisma } from "../../conn";

// fetching user data
export class UserRepositoryPrisma extends UserRepository {
  fetchAllUsers = async () => {
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
  }: userData) => {
    const userObject = { name, email, password, address, phone };
    const newUser = await prisma.userData.create({
      data: userObject,
    });
    return newUser;
  };

  deleteUser = async (userObject: userData) => {
    const user = await prisma.userData.delete({
      where: {
        email: userObject.email,
      },
    });
    if (user === null) throw new Error("User not defined");
    return user;
  };

  updateUser = async (dataUpdate: userData) => {
    const userUpdated = await prisma.userData.update({
      where: {
        email: dataUpdate.email,
      },
      data: dataUpdate,
    });
    if (userUpdated === null) throw new Error("User is null");
    return userUpdated;
  };
}

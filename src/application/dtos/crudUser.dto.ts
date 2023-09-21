import { userSchemaZod } from "./user.dto";
import { z, ZodType } from "zod";

// add this DeepNonNullable thing to get rid of the undefined part in zod schema
type DeepNonNullable<T> = T extends (infer U)[]
  ? DeepNonNullable<U>[]
  : T extends object
  ? { [K in keyof T]: DeepNonNullable<T[K]> }
  : NonNullable<T>;

const userID = z.object({ id: z.string() });
const userWithId = userSchemaZod.merge(userID);

export type DeleteUserDto = z.infer<typeof userSchemaZod>;

// We want our database to automatically assign an id to the user when he creates an account;
// that is why we create a type of the userSchemaZod which does not have id in it
export type CreateUserDto = z.infer<typeof userSchemaZod>;

export const partialUserSchema = userSchemaZod.partial();

// For an update (PUT/PATCH) request we dont want the user to transfer the whole User Object; BUT only those properties which
// need to be updated so, we create a partial of the userSchemaZod-- by doing so we make all the properties of the userSchemaZod
// optional
// export type UpdateUserDto= Exclude<NonNullable<z.infer<typeof partialUserSchema>>, null>

export type removingUndefined<T extends ZodType> = DeepNonNullable<z.infer<T>>;
export type UpdateUserDto = removingUndefined<typeof userSchemaZod>;

export type UserTypeWithId = z.infer<typeof userWithId>;

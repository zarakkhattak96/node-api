import validateInput from "../middleware/validation.middleware";
import { partialUserSchema } from "../crudUser.dto";
import { userSchemaZod } from "../user.dto";

export const validateCreatedUser = validateInput(userSchemaZod);
export const validateUpdatedUser = validateInput(partialUserSchema);
export const validateDeletedUser = validateInput(userSchemaZod);

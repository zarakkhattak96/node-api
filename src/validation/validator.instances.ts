import validateInput from "../middleware/validation.middleware";
import { partialUserSchema, userSchemaZod } from "./user.validation";

export const validateCreatedUser = validateInput(userSchemaZod);
export const validateUpdatedUser = validateInput(partialUserSchema);

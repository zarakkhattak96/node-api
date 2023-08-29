import * as dotenv from "dotenv";

dotenv.config();

const getFromEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) throw new Error(`${key} not defined in env`);

  return value;
};

const DB_URL = getFromEnv("DATABASE_URL");
const PORT = getFromEnv("PORT");

export default {
  DB_URL,
  PORT,
};

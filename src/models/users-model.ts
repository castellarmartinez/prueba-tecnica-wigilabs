import { logger } from "../utils/logger";
import { Users } from "./users-mongo";

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: number;
}

export async function saveUser(user: User) {
  try {
    await Users.create(user);
  } catch (error) {
    logger.error(`Error while trying to create the user: ${error}`);
    throw error;
  }
}

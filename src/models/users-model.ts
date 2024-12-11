import jwt from "jsonwebtoken";
import { config } from "dotenv";

import { logger } from "../utils/logger";
import { Users } from "./users-mongo";

config({ path: "../.env" });

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: number;
  token?: string;
}

export async function saveUser(user: User) {
  try {
    await Users.create(user);
  } catch (error) {
    logger.error(`Error while trying to create the user: ${error}`);
    throw error;
  }
}

export async function getAuthToken(user: User) {
  try {
    const existingUser = await Users.findOne({ email: user.email });
    const secrets = String(process.env.SECRET_PASS);
    let token = "";

    if (existingUser) {
      token = jwt.sign({ _id: existingUser._id.toString() }, secrets);
      existingUser.token = token;
      await existingUser.save();
    }

    return token;
  } catch (error) {
    logger.error(`Error while trying to log in: ${error}`);
    throw error;
  }
}

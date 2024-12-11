import mongoose from "mongoose";
import { config } from "dotenv";

import { logger } from "../utils/logger";

config({ path: "../.env" });

export async function connectToDatabase() {
  const uri = String(process.env.MONGO_URL);

  try {
    await mongoose.connect(uri);
    logger.info("Connected to the database.");
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    logger.error(error);
    logger.info("The process has finished.\nPlease restart the process.");
    process.exit(0);
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    logger.error(error);
  }
}

import http from "node:http";

import { config } from "dotenv";

import { app } from "./src/app";
import { logger } from "./src/utils/logger";


config({ path: ".env" });

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT ?? DEFAULT_PORT;

const server = http.createServer(app);

async function startServer() {
  try {
    //await connectToDatabase();
  } catch (error) {
    logger.error("Error while trying to start the server:", error);
  }

  server.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}...`);
  });
}

startServer();

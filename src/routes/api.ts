import express from "express";
import swaggerUi from "swagger-ui-express";

import { usersRouter } from "./users/users-router";
import swaggerDocument from "./swagger.json";
import { errorHandler } from "./errors/error-controller";

export const api = express();

api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
api.use("/users", usersRouter);
api.use(errorHandler);

import express from "express";
import swaggerUi from "swagger-ui-express";

import { usersRouter } from "./users/users-router";
import swaggerDocument from "./swagger.json";

export const api = express();

api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
api.use("/users", usersRouter);

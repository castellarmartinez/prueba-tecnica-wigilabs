import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Wigilabs Prueba Tecnica",
    description:
      "Este proyecto es una api básica de nodejs dónde se implementan el creado de usuarios y el login de los mismos.",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
    petstore_auth: {
      type: "oauth2",
      authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
      flow: "implicit",
      scopes: {
        read_pets: "read your pets",
        write_pets: "modify pets in your account",
      },
    },
  },
  definitions: {
    Parents: {
      father: "Simon Doe",
      mother: "Marie Doe",
    },
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        $ref: "#/definitions/Parents",
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company",
          },
        },
      ],
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: "",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routes/users/user-router.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

const endpointsFiles = ["./src/endpoints.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.ts"); // Your project's root file
});

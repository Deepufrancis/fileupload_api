import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "file upload/cdn api",
        version: "1.0.0",
        description: "API for uploading files and serving them via CDN",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./src/routes/**/*.ts"], 
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

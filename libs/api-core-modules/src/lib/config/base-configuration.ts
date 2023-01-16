import { BaseConfiguration } from "./base-configuration.interface";

export const loadApiConfiguration = (): BaseConfiguration => ({
  debug: process.env["DEBUG"] === "true" ?? false,
  playground: process.env["PLAYGROUND"] === "true" ?? false,
  port: +(process.env["API_PORT"] ?? 8080),
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  httpTimeout: +(process.env["HTTP_TIMEOUT"] ?? 5000),
  httpMaxRedirects: +(process.env["HTTP_MAX_REDIRECTS"] ?? 5),
  globalPrefix: process.env["API_GLOBAL_PREFIX"] ?? "api",
  apiTitle: process.env["API_TITLE"] ?? "api-service",
  apiPrefix: process.env["API_PREFIX"] ?? "API_Service_",
  dbUrl: process.env["DB_URL"] ?? "",
  apiDatabaseUrl: process.env["API_DB_URL"] ?? ""
});

export const loadDatabaseApiConfiguration = (): BaseConfiguration => ({
  debug: process.env["DEBUG"] === "true" ?? false,
  playground: process.env["PLAYGROUND"] === "true" ?? false,
  port: +(process.env["DATABASE_API_PORT"] ?? 8081),
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  httpTimeout: +(process.env["HTTP_TIMEOUT"] ?? 5000),
  httpMaxRedirects: +(process.env["HTTP_MAX_REDIRECTS"] ?? 5),
  globalPrefix: process.env["DATABASE_API_GLOBAL_PREFIX"] ?? "api",
  apiTitle: process.env["DATABASE_API_TITLE"] ?? "api-service",
  apiPrefix: process.env["DATABASE_API_PREFIX"] ?? "API_Service_",
  dbUrl: process.env["DATABASE_API_DB_URL"] ?? "",
  apiDatabaseUrl: ""
});

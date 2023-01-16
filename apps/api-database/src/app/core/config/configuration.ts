import { Configuration } from "./configuration.interface";
import { loadDatabaseApiConfiguration } from "@nestjs-logging-tracing/api-core-modules";

export default (): Configuration => ({
  ...loadDatabaseApiConfiguration()
});

import { Configuration } from "./configuration.interface";
import { loadApiConfiguration } from "@nestjs-logging-tracing/api-core-modules";

export default (): Configuration => ({
  ...loadApiConfiguration()
});

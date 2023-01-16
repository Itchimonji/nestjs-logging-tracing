export interface BaseConfiguration {
  debug: boolean;
  playground: boolean;
  port: number;
  nodeEnv: string;
  httpTimeout: number;
  httpMaxRedirects: number;
  globalPrefix: string;
  apiTitle: string;
  apiPrefix: string;
  dbUrl: string;
  apiDatabaseUrl: string;
}

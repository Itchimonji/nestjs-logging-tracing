import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { ApiCoreModulesModule } from "@nestjs-logging-tracing/api-core-modules";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./core/config/configuration";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ApiCoreModulesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get("httpTimeout"),
        maxRedirects: configService.get("httpMaxRedirects")
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController]
})
export class AppModule {}

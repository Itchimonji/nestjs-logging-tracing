import { Controller, Get, HttpException, Post, UseInterceptors } from "@nestjs/common";
import { Movies } from "@nestjs-logging-tracing/api-interfaces";
import { HttpService } from "@nestjs/axios";
import { winstonLogger } from "@nestjs-logging-tracing/api-core-modules";
import { catchError, map } from "rxjs";
import { AxiosResponse } from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";
import { ConfigService } from "@nestjs/config";

const TAG = "AppController";

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  @Get("movies")
  getMovies() {
    winstonLogger?.info("API movies call");
    winstonLogger?.info(this.configService.get("apiDatabaseUrl"));

    return this.httpService.get<Movies[]>(this.configService.get("apiDatabaseUrl") + "movies").pipe(
      map((response: AxiosResponse) => response.data),
      catchError(err => {
        winstonLogger?.warn(
          "Endpoint for Database API is not accessable. Please make sure the service is running. " + err,
          TAG
        );
        throw new HttpException(
          "Database API not available. Please make sure the service is running and accessable." + err,
          err.response?.status
        );
      })
    );
  }

  @Post("error")
  postError() {
    winstonLogger?.error("Error");
    return this.httpService.post(this.configService.get("apiDatabaseUrl") + "error");
  }
}

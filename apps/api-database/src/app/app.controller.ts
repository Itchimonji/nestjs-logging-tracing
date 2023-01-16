import { Controller, Get, Post, HttpException, UseInterceptors, Inject } from "@nestjs/common";

import { HttpService } from "@nestjs/axios";
import { catchError, map, tap } from "rxjs";
import { winstonLogger } from "@nestjs-logging-tracing/api-core-modules";
import { AxiosResponse } from "@nestjs/terminus/dist/health-indicator/http/axios.interfaces";

const TAG = "AppController";

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get("movies")
  getMovies() {
    const url: string = "https://swapi.dev/api/films/";
    winstonLogger?.info("Contact endpoint: " + url);
    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => response.data.results),
      catchError(err => {
        winstonLogger?.info(
          "Endpoint for external API is not accessable. Please make sure the service is running. ",
          TAG
        );
        throw new HttpException(
          "External API not available. Please make sure the service is running and accessable.",
          err.response?.status
        );
      }),
      tap(() => winstonLogger?.info("Successfully called endpoint: " + url))
    );
  }

  @Post("error")
  postError() {
    winstonLogger?.error("Error call");
    throw new HttpException("Error call", 500);
  }
}

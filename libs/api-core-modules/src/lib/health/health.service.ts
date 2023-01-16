import { Injectable } from "@nestjs/common";
import { HealthCheck, HealthCheckResult, HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";
import { HealthIndicator } from "./interfaces/health-indicator.interface";
import { AbstractPromClientService } from "../prometheus/models/prom-client.abstract";
import { ReadinessIndicator } from "./models/readiness.indicator";
import { winstonLogger } from "../logging/logging.model";

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prometheusClientService: AbstractPromClientService
  ) {
    this.listOfThingsToMonitor = [new ReadinessIndicator(this.prometheusClientService)];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return await this.health.check(
      this.listOfThingsToMonitor.map(apiIndicator => async () => {
        try {
          return await apiIndicator.isHealthy();
        } catch (error) {
          winstonLogger?.warn(error);
          return apiIndicator.reportUnhealthy();
        }
      })
    );
  }

  public getIndicatorByName(name: string): HealthIndicator | undefined {
    return this.listOfThingsToMonitor.find((x: HealthIndicator) => x.name === name);
  }
}

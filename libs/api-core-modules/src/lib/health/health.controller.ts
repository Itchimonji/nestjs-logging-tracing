import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { HealthCheckResult } from "@nestjs/terminus";
import { HealthService } from "./health.service";

@Controller("health")
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  public async check(): Promise<HealthCheckResult> {
    const healthCheckResult: HealthCheckResult = await this.healthService.check();
    for (const key in healthCheckResult.info) {
      if (healthCheckResult.info[key].status === "down") {
        throw new ServiceUnavailableException(healthCheckResult);
      }
    }
    return healthCheckResult;
  }
}

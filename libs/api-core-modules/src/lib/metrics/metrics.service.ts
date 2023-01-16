import { Injectable } from "@nestjs/common";
import { AbstractPromClientService } from "../prometheus/models/prom-client.abstract";
import { HealthService } from "../health/health.service";

@Injectable()
export class MetricsService {
  public get metrics(): Promise<string> {
    this.healthService.check();
    return this.promClientService.metrics;
  }

  constructor(private promClientService: AbstractPromClientService, private healthService: HealthService) {}
}

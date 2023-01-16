import { HealthIndicatorResult } from "@nestjs/terminus";
import { BaseHealthIndicator } from "./base-health.indicator";
import { HealthIndicator } from "../interfaces/health-indicator.interface";
import { AbstractPromClientService } from "../../prometheus/models/prom-client.abstract";
import { ApplicationReadiness } from "../../readiness/readiness.model";

export class ReadinessIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name = "Ready";
  protected readonly help = "Status of " + this.name;

  constructor(protected promClientService: AbstractPromClientService) {
    super();
    this.promClientService = promClientService;
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const isReady = ApplicationReadiness.getInstance().isReady;
    this.updatePrometheusData(isReady);
    return this.getStatus(this.name, isReady);
  }
}

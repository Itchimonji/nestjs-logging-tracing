import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { Gauge } from "prom-client";
import { AbstractPromClientService } from "../../prometheus/models/prom-client.abstract";
import { PrometheusHistogram } from "../../prometheus/prom-client.service";
import { winstonLogger } from "../../logging/logging.model";

// Design Pattern: Template Method
// source: https://github.com/siimon/prom-client

const TAG = "HealthCheck";

export abstract class BaseHealthIndicator extends HealthIndicator {
  public abstract name: string;
  public callMetrics: any;

  protected abstract help: string;
  protected abstract readonly promClientService: AbstractPromClientService | undefined;
  protected readonly labelNames = ["status"];
  protected readonly buckets = [1];
  protected stateIsConnected = false;

  private metricsRegistered = false;
  private gaugesRegistered = false;
  private gauge: Gauge<string> | undefined;

  protected registerMetrics(): void {
    if (this.promClientService) {
      winstonLogger?.info("Register metrics histogram for: " + this.name, TAG);
      this.metricsRegistered = true;
      const histogram: PrometheusHistogram = this.promClientService.registerMetrics(
        this.name,
        this.help,
        this.labelNames,
        this.buckets
      );
      this.callMetrics = histogram.startTimer();
    }
  }

  protected registerGauges(): void {
    if (this.promClientService) {
      winstonLogger?.info("Register metrics gauge for: " + this.name, TAG);
      this.gaugesRegistered = true;
      this.gauge = this.promClientService.registerGauge(this.name, this.help);
    }
  }

  protected isDefined(value: string | undefined): boolean {
    return !!value;
  }

  public updatePrometheusData(isConnected: boolean): void {
    if (this.stateIsConnected !== isConnected) {
      if (isConnected) {
        winstonLogger?.info(this.name + " is available", TAG);
      }

      this.stateIsConnected = isConnected;

      if (this.metricsRegistered) {
        this.callMetrics({ status: this.stateIsConnected ? 1 : 0 });
      }

      if (this.gaugesRegistered) {
        this.gauge?.set(this.stateIsConnected ? 1 : 0);
      }
    }
  }

  public abstract isHealthy(): Promise<HealthIndicatorResult>;

  public reportUnhealthy(): HealthIndicatorResult {
    this.updatePrometheusData(false);
    return this.getStatus(this.name, false);
  }

  public get customMetricsRegistered(): boolean {
    return this.metricsRegistered;
  }

  public get customGaugesRegistered(): boolean {
    return this.gaugesRegistered;
  }
}

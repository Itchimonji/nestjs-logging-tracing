import { Gauge, Histogram } from 'prom-client';

export abstract class AbstractPromClientService {
  public abstract get metrics(): Promise<string>;
  public abstract registerMetrics(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[]
  ): Histogram<string>;
  public abstract registerGauge(name: string, help: string): Gauge<string>;
  public abstract removeSingleMetric(name: string): void;
  public abstract clearMetrics(): void;
}

import { Module } from "@nestjs/common";
import { HealthModule } from "../health/health.module";
import { MetricsController } from "./metrics.controller";
import { MetricsService } from "./metrics.service";
import { PrometheusModule } from "../prometheus/prometheus.module";

@Module({
  imports: [HealthModule, PrometheusModule],
  controllers: [MetricsController],
  providers: [MetricsService]
})
export class MetricsModule {}

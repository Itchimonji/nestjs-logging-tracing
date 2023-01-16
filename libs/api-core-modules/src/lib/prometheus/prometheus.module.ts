import { Module } from '@nestjs/common';
import { PromClientService } from './prom-client.service';
import { AbstractPromClientService } from './models/prom-client.abstract';

@Module({
  providers: [{ provide: AbstractPromClientService, useClass: PromClientService }],
  exports: [AbstractPromClientService]
})
export class PrometheusModule {}

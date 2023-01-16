import { Module } from '@nestjs/common';
import { ReadinessController } from './readiness.controller';

@Module({
  controllers: [ReadinessController]
})
export class ReadinessModule {}

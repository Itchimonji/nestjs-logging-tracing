import { HealthIndicatorResult } from '@nestjs/terminus/dist/health-indicator';

export class MockHttpHealthIndicator {
  public pingCheck(key: string, url: string): Promise<HealthIndicatorResult> {
    return new Promise(resolve => {
      resolve({ [key]: { status: 'up' } });
    });
  }
}

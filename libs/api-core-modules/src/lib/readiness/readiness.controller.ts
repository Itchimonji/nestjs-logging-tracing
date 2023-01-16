import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { ApplicationReadiness } from "./readiness.model";

@Controller("readiness")
export class ReadinessController {
  @Get()
  public async check(): Promise<boolean> {
    if (!ApplicationReadiness.getInstance().isReady) {
      throw new ServiceUnavailableException(false);
    }
    return ApplicationReadiness.getInstance().isReady;
  }
}

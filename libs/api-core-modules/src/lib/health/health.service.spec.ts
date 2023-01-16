import { Test } from "@nestjs/testing";
import { HealthCheckExecutor } from "@nestjs/terminus/dist/health-check/health-check-executor.service";
import { HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";
import { HealthService } from "./health.service";
import { MockHttpHealthIndicator } from "./mocks/http-health-indicator.mock";
import { AbstractPromClientService } from "../prometheus/models/prom-client.abstract";
import { PromClientService } from "../prometheus/prom-client.service";
import { DatabaseModule } from "../database/database.module";

describe("HealthService", () => {
  let promClientService: AbstractPromClientService;
  let healthService: HealthService;
  let httpHealthIndicator: HttpHealthIndicator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        HealthService,
        HealthCheckService,
        HealthCheckExecutor,
        { provide: AbstractPromClientService, useClass: PromClientService },
        { provide: HttpHealthIndicator, useClass: MockHttpHealthIndicator }
      ]
    }).compile();

    promClientService = moduleRef.get<AbstractPromClientService>(AbstractPromClientService);
    healthService = moduleRef.get<HealthService>(HealthService);
    httpHealthIndicator = moduleRef.get<HttpHealthIndicator>(HttpHealthIndicator);
  });

  it("should get health values by health service with a control core has no env variable", done => {
    // control core has no env variable
    promClientService.clearMetrics();

    jest.spyOn(httpHealthIndicator, "pingCheck").mockImplementation(
      () =>
        new Promise(resolve => {
          resolve({
            ["Ready"]: { status: "up" }
          });
        })
    );

    healthService.check().then(result => {
      expect(healthService.getIndicatorByName("Ready").customMetricsRegistered).toBeFalsy();
      expect(result).toStrictEqual({
        details: {
          Prisma: {
            status: "down"
          },
          Ready: {
            status: "down"
          }
        },
        error: {},
        info: {
          Prisma: {
            status: "down"
          },
          Ready: {
            status: "down"
          }
        },
        status: "ok"
      });
      done();
    });
  });
});

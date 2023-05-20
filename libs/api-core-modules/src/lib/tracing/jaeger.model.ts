import * as opentelemetry from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { winstonLogger } from '../logging/logging.model';

export const initTracing = async (): Promise<void> => {
  const traceExporter = new JaegerExporter({
    endpoint: process.env['JAEGER_COLLECTOR'],
  });

  const spanProcessor =
    process.env['JAEGER_ENV'] === `development`
      ? new SimpleSpanProcessor(traceExporter)
      : new BatchSpanProcessor(traceExporter);

  const sdk = new opentelemetry.NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]:
        process.env['JAEGER_SERVICE_NAME'],
    }),
    instrumentations: [
      // getNodeAutoInstrumentations(),
      new HttpInstrumentation(),
      // new ExpressInstrumentation(),
      new NestInstrumentation(),
    ],
    // Using a simple span processor for faster response.
    // You can also use the batch processor instead.
    spanProcessor: spanProcessor,
  });

  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });

  try {
    await sdk.start();
    winstonLogger?.info('Tracing initialized');
  } catch (error) {
    winstonLogger?.info('Error initializing tracing', error);
  }
};

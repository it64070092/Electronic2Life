require('dotenv').config();


const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

console.log('OTEL_EXPORTER_OTLP_HEADERS:', process.env.OTEL_EXPORTER_OTLP_HEADERS);


// Create OTLP Exporters
const traceExporter = new OTLPTraceExporter({
  url: 'http://10.111.0.36:55681/v1/traces',
  headers: {
    'Authorization': `Bearer ${process.env.OTEL_EXPORTER_OTLP_HEADERS}`, // Ensure this is correctly formatted
  },
});

const metricExporter = new OTLPMetricExporter({
  url: 'http://10.111.0.36:8888/v1/metrics',
  headers: {
    'Authorization': `Bearer ${process.env.OTEL_EXPORTER_OTLP_HEADERS}`, // Ensure this is correctly formatted
  },
});

// SDK Configuration
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-mongoose': { enabled: true },
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-axios': { enabled: true },
    }),
  ],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'Elec2life-Otel',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'development',
  }),
});

// Metric provider setup with periodic metric export
const meterProvider = new MeterProvider({
  resource: sdk.resource,
  readers: [new PeriodicExportingMetricReader({ exporter: metricExporter, exportIntervalMillis: 60000 })],
});

// Start SDK for Traces and Metrics
sdk.start();

// Graceful shutdown for OpenTelemetry
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down successfully'))
    .catch((error) => console.error('Error shutting down OpenTelemetry SDK', error))
    .finally(() => process.exit(0));
});


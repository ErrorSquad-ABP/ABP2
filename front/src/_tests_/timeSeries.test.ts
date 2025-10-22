/*import { prepareTimeSeries } from '../utils/timeSeries';
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
};

describe('prepareTimeSeries', () => {
  it('deve achatar estrutura simples e agrupar por timestamp', () => {
    const data = [
      {
        deviceId: 'A',
        sensor: 'temp',
        readings: [
          { timestamp: '2025-10-01T00:00:00Z', value: 10 },
          { timestamp: '2025-10-01T01:00:00Z', value: 20 },
        ],
      },
      {
        deviceId: 'A',
        sensor: 'temp',
        readings: [
          { timestamp: '2025-10-01T00:00:00Z', value: 5 },
        ],
      },
    ];

    const result = prepareTimeSeries(data, {
      timestampKeys: ['timestamp'],
      valueKeys: ['value'],
      groupKeys: ['deviceId', 'sensor'],
      aggregator: 'sum',
    });

    expect(result.length).toBe(1);
    const series = result[0];
    const points = series.points;

    // Verifica se somou corretamente os valores do mesmo timestamp
    const point0 = points.find(p => p.t === '2025-10-01T00:00:00.000Z');
    expect(point0?.v).toBe(15);

    const point1 = points.find(p => p.t === '2025-10-01T01:00:00.000Z');
    expect(point1?.v).toBe(20);
  });

  it('deve converter epoch (segundos e milissegundos) corretamente', () => {
    const data = [
      { timestamp: 1696118400, value: 10 }, // epoch s
      { timestamp: 1696118400000, value: 20 }, // epoch ms
    ];

    const result = prepareTimeSeries([data], { timestampKeys: ['timestamp'], valueKeys: ['value'] });
    const series = result[0];

    expect(series.points.length).toBe(2);
    expect(series.points[0].t).toMatch(/^2025|2023|2024/); // qualquer ano válido, só valida que virou ISO
  });

  it('deve lidar com objetos do tipo mapa (timestamp como chave)', () => {
    const data = [
      {
        deviceId: 'B',
        measurements: {
          '2025-10-01T00:00:00Z': 100,
          '2025-10-01T01:00:00Z': 120,
        },
      },
    ];

    const result = prepareTimeSeries(data, {
      groupKeys: ['deviceId'],
      aggregator: 'sum',
    });

    expect(result.length).toBe(1);
    const series = result[0];
    expect(series.points.length).toBe(2);
    expect(series.points[0].v).toBe(100);
    expect(series.points[1].v).toBe(120);
  });

  it('deve calcular agregadores diferentes corretamente', () => {
    const baseData = [
      { timestamp: '2025-10-01T00:00:00Z', value: 10 },
      { timestamp: '2025-10-01T00:00:00Z', value: 20 },
    ];

    const runAgg = (agg: any) =>
      prepareTimeSeries([baseData], {
        timestampKeys: ['timestamp'],
        valueKeys: ['value'],
        aggregator: agg,
      })[0].points[0].v;

    expect(runAgg('sum')).toBe(30);
    expect(runAgg('avg')).toBe(15);
    expect(runAgg('min')).toBe(10);
    expect(runAgg('max')).toBe(20);
    expect(runAgg('count')).toBe(2);
  });

  it('deve ordenar pontos por timestamp ascendente', () => {
    const data = [
      { timestamp: '2025-10-02T00:00:00Z', value: 1 },
      { timestamp: '2025-10-01T00:00:00Z', value: 1 },
    ];

    const result = prepareTimeSeries([data], {
      timestampKeys: ['timestamp'],
      valueKeys: ['value'],
    });

    const timestamps = result[0].points.map(p => p.t);
    expect(timestamps[0] < timestamps[1]).toBeTruthy();
  });

  it('deve ignorar valores e timestamps inválidos', () => {
    const data = [
      { timestamp: 'invalid', value: 10 },
      { timestamp: '2025-10-01T00:00:00Z', value: 'abc' },
      { timestamp: '2025-10-01T01:00:00Z', value: 20 },
    ];

    const result = prepareTimeSeries([data], {
      timestampKeys: ['timestamp'],
      valueKeys: ['value'],
    });

    const points = result[0].points;
    expect(points.length).toBe(1);
    expect(points[0].v).toBe(20);
  });

  it('deve criar seriesId únicos baseados em groupKeys', () => {
    const data = [
      { deviceId: 'A', sensor: 'temp', readings: [{ timestamp: '2025-10-01T00:00:00Z', value: 1 }] },
      { deviceId: 'B', sensor: 'temp', readings: [{ timestamp: '2025-10-01T00:00:00Z', value: 2 }] },
    ];

    const result = prepareTimeSeries(data, {
      timestampKeys: ['timestamp'],
      valueKeys: ['value'],
      groupKeys: ['deviceId'],
    });

    const ids = result.map(s => s.seriesId);
    expect(ids.length).toBe(2);
    expect(ids.some(id => id.includes('deviceId=A'))).toBeTruthy();
    expect(ids.some(id => id.includes('deviceId=B'))).toBeTruthy();
  });
});
*/

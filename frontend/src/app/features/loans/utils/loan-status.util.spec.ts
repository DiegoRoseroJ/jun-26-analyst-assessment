import { getLoanStatus } from './loan-status.util';

declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: <T = unknown>(actual: T) => { toBe: (expected: T) => void };

describe('getLoanStatus', () => {
  const today = new Date(2026, 5, 30);

  it('returns Overdue for yesterday', () => {
    expect(getLoanStatus('2026-06-29', today)).toBe('Overdue');
  });

  it('returns Due today for today', () => {
    expect(getLoanStatus('2026-06-30', today)).toBe('Due today');
  });

  it('returns Due soon for tomorrow and the next 3 days', () => {
    expect(getLoanStatus('2026-07-01', today)).toBe('Due soon');
    expect(getLoanStatus('2026-07-03', today)).toBe('Due soon');
  });

  it('returns On time for dates later than the next 3 days', () => {
    expect(getLoanStatus('2026-07-04', today)).toBe('On time');
  });
});

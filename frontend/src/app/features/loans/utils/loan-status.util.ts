export type LoanStatus = 'Overdue' | 'Due today' | 'Due soon' | 'On time';

function toLocalDate(value: string | Date): Date {
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getLoanStatus(dueOn: string | Date, today = new Date()): LoanStatus {
  const dueDate = toLocalDate(dueOn);
  const currentDate = toLocalDate(today);
  const diffDays = Math.round((dueDate.getTime() - currentDate.getTime()) / 86400000);

  if (diffDays < 0) {
    return 'Overdue';
  }

  if (diffDays === 0) {
    return 'Due today';
  }

  if (diffDays <= 3) {
    return 'Due soon';
  }

  return 'On time';
}

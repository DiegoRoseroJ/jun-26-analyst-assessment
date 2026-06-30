import { Component, Input } from '@angular/core';
import { Loan } from '../../../models/loan.model';

@Component({
  selector: 'app-loan-row',
  imports: [],
  template: `
    <div class="loan-row">
      <span class="member">{{ loan.memberName }}</span>
      <span class="book">{{ loan.bookTitle }}</span>
      <span class="due">Due {{ loan.dueOn }}</span>
      <span class="badge" [class.overdue]="status === 'Overdue'">{{ status }}</span>
    </div>
  `,
  styles: [
    `
      .loan-row {
        padding: 8px 0;
        border-bottom: 1px solid #ddd;
      }
      .member {
        font-weight: 600;
        margin-right: 12px;
      }
      .book {
        font-style: italic;
        margin-right: 12px;
      }
      .due {
        color: #555;
        margin-right: 12px;
      }
      .badge {
        padding: 2px 8px;
        border-radius: 10px;
        background: #e8e8e8;
        color: #333;
      }
      .badge.overdue {
        background: #f8d7da;
        color: #842029;
      }
    `,
  ],
})
export class LoanRowComponent {
  @Input({ required: true }) loan!: Loan;

  get status(): string {
    const due = new Date(this.loan.dueOn + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((due.getTime() - today.getTime()) / 86400000);
    if (diffDays < 0) {
      return 'Overdue';
    }
    if (diffDays <= 3) {
      return 'Due soon';
    }
    return 'On time';
  }
}

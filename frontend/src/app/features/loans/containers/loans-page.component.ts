import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../core/services/loan.service';
import { Loan } from '../../../models/loan.model';
import { LoanRowComponent } from '../components/loan-row.component';

@Component({
  selector: 'app-loans-page',
  imports: [LoanRowComponent],
  template: `
    <section class="page">
      <h1>Riverside Library — Loan Desk</h1>

      <div class="summary">
        <span>Overdue: {{ overdueCount }}</span>
        <span>Due soon: {{ dueSoonCount }}</span>
        <span>On time: {{ onTimeCount }}</span>
      </div>

      <div class="loans">
        @for (loan of loans; track loan.id) {
          <app-loan-row [loan]="loan" />
        } @empty {
          <p>No active loans.</p>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        max-width: 720px;
        margin: 24px auto;
        font-family: sans-serif;
      }
      .summary {
        margin: 16px 0;
        color: #333;
      }
      .summary span {
        margin-right: 16px;
        font-weight: 600;
      }
    `,
  ],
})
export class LoansPageComponent implements OnInit {
  loans: Loan[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (loans) => (this.loans = loans),
      error: (err) => console.error(err),
    });
  }

  get overdueCount(): number {
    return this.loans.filter((loan) => this.deriveStatus(loan) === 'Overdue').length;
  }

  get dueSoonCount(): number {
    return this.loans.filter((loan) => this.deriveStatus(loan) === 'Due soon').length;
  }

  get onTimeCount(): number {
    return this.loans.filter((loan) => this.deriveStatus(loan) === 'On time').length;
  }

  private deriveStatus(loan: Loan): string {
    const due = new Date(loan.dueOn + 'T00:00:00');
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

import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../core/services/loan.service';
import { Loan } from '../../../models/loan.model';
import { LoanRowComponent } from '../components/loan-row.component';
import { getLoanStatus, LoanStatus } from '../utils/loan-status.util';

@Component({
  selector: 'app-loans-page',
  imports: [LoanRowComponent],
  template: `
    <section class="page">
      <h1>Riverside Library — Loan Desk</h1>

      <div class="summary">
        <span>Overdue: {{ overdueCount }}</span>
        <span>Due today: {{ dueTodayCount }}</span>
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
    return this.getStatusCount('Overdue');
  }

  get dueTodayCount(): number {
    return this.getStatusCount('Due today');
  }

  get dueSoonCount(): number {
    return this.getStatusCount('Due soon');
  }

  get onTimeCount(): number {
    return this.getStatusCount('On time');
  }

  private getStatusCount(status: LoanStatus): number {
    return this.loans.filter((loan) => getLoanStatus(loan.dueOn) === status).length;
  }
}

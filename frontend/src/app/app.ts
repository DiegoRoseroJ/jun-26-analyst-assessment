import { Component } from '@angular/core';
import { LoansPageComponent } from './features/loans/containers/loans-page.component';

@Component({
  selector: 'app-root',
  imports: [LoansPageComponent],
  template: `<app-loans-page />`,
})
export class App {}

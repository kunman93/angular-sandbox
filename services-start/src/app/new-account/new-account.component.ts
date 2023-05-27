import { Component } from '@angular/core';
import { LoggingService } from '../services/logging.service';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) { 
    this.accountsService.statusUpdatede.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  onCreateAccount(newAccount: {
    accountName: string, 
    status: string
  }) {
    this.accountsService.addAccount(newAccount);
    this.loggingService.logStatusChange(newAccount.status);
  }
}

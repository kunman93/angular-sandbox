import { Component, Input } from '@angular/core';
import { LoggingService } from '../services/logging.service';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) { }

  onSetStatus(status: string) {
    var id = this.id;
    this.accountsService.updateStatus({id, status});
    this.loggingService.logStatusChange(status)
    this.accountsService.statusUpdatede.emit(status)
  }
}

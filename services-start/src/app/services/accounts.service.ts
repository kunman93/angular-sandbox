import { EventEmitter } from "@angular/core";

export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  statusUpdatede = new EventEmitter<string>();

  addAccount(newAccount: {accountName: string,  status: string}) {
    this.accounts.push({
      name: newAccount.accountName,
      status: newAccount.status
    });
  }

  updateStatus(updatedInfo: {id: number, status: string}) {
    this.accounts[updatedInfo.id].status = updatedInfo.status;
  }
}
import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { GeneralAccount } from 'src/shared/GeneralAccount.entity';
import { GenralLedger } from 'src/shared/GeneralLedger.entity';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor() {}


  generalLedgerRepo = remult.repo(GenralLedger);
  generalAccountRepo = remult.repo(GeneralAccount);

  async getLedgers() {
    const data = await this.generalLedgerRepo.find();
    return data;
  }
  async getAccounts(){
    const data = await this.generalAccountRepo.find();
    return data;
  }
}

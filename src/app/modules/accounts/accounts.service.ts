import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { GeneralAccount } from 'src/shared/GeneralAccount.entity';
import { GeneralLedger } from 'src/shared/GeneralLedger.entity';
import { BalancesheetGroup } from 'src/shared/BalanceseetCode.entity';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor() {}


  generalLedgerRepo = remult.repo(GeneralLedger);
  generalAccountRepo = remult.repo(GeneralAccount);
  bgGroupRepo = remult.repo(BalancesheetGroup);

  async getLedgers() {
    const data = await this.generalLedgerRepo.find();
    return data;
  }
  async findBySubsystem(subsystem:string){
    const data = await this.generalLedgerRepo.findFirst({
      subsystem: subsystem.trim(),
    });
    return data;
  }
  async findLedger(id:any){
    const data = await this.generalLedgerRepo.findFirst({
      id: id,
    });
    return data;
  }

  async getAccounts(){
    const data = await this.generalAccountRepo.find({ orderBy: { id: "desc" }});
    return data;
  }
  async findAccount(id:number):Promise<GeneralAccount>{
    const data = await this.generalAccountRepo.findId(id.toString());
    return data!;
  }

  async getBsGroups(){
    const data = await this.bgGroupRepo.find();
    return data;
  }

  async updateLedger(ledgerId: string, updatedLedgerData: any): Promise<GeneralLedger> {
    await this.generalLedgerRepo.update(ledgerId.toString(), updatedLedgerData);
    return updatedLedgerData;
  }

  // updateAccount
  async updateAccount(accountId: string, updatedAccountData: any): Promise<GeneralLedger> {
    await this.generalAccountRepo.update(accountId.toString(), updatedAccountData);
    return updatedAccountData;
  }

  
}

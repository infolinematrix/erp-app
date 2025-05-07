import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { GeneralAccount } from 'src/shared/GeneralAccount.entity';
import { GeneralLedger } from 'src/shared/GeneralLedger.entity';
import { TransactionMaster } from 'src/shared/TransactionMaster.entity';
import { BalancesheetGroup } from 'src/shared/BalanceseetCode.entity';
import { scrollType, txnMode } from 'src/app/core/constants/enums';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor() {}


  generalLedgerRepo = remult.repo(GeneralLedger);
  generalAccountRepo = remult.repo(GeneralAccount);
  bgGroupRepo = remult.repo(BalancesheetGroup);
  transactionMasterRepo = remult.repo(TransactionMaster);

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
  async findAccountsBySubsystem(subsystem:string){
    const data = await this.generalAccountRepo.find({
      where:{
        subsystem:subsystem
      }
    });
    
    return data!;
  }

  async getBanks(){
    const data = await this.generalAccountRepo.find({
      where:{
        subsystem:'BANK'
      },
      orderBy: { subsystem: "asc" }
    });
    console.log("------------",data);
    
    return data;
  }

    /**
   * Receive
   * @param formData 
   * @returns 
   */
  async createTransactionReceive(formData:TransactionMaster){
    
    console.log('Txn Data ', formData.subsystem);
    const type = formData.mode?.toString().trim() === txnMode.Cash ? scrollType.HC : scrollType.KC;
    const {scroll_type, scroll_no, scroll_slno} = await this.createNewScroll(type);

    const data:any = {
      subsystem: formData.subsystem,
      account: formData.account,
      mode: formData.mode || txnMode.Cash,
      amount: formData.amount,

      bank: formData.bank || 0,
      description: formData.description,
      narration: formData.narration,
      
      scroll_type: scroll_type,
      scroll_no:scroll_no!,
      scroll_slno: scroll_slno!,
      user: 1,
      status: 1,
      center_code: 'MAIN',
    }
    
    await remult.repo(TransactionMaster).insert(data);

    return {scroll_type, scroll_no, scroll_slno}
  }

  /**
   * Transactions
   * @param from_date 
   * @param to_date 
   * @param type 
   */
  async getTransactions(from_date:Date, to_date:Date, type:string, limit:number=25, page:number=1){
    const data = await this.transactionMasterRepo.find({
      where:{},
      limit:limit,
      page:page,
      orderBy:{id:'desc'}
    });
    return data;
  }
  /**
   * Payement
   * @param formData 
   * @returns 
   */
  async createTransactionPayment(formData:TransactionMaster){
    
    console.log('Txn Data ', formData.subsystem);
    const type = formData.mode?.toString().trim() === txnMode.Cash ? scrollType.HC : scrollType.KC;
    console.log(type);

    const {scroll_type, scroll_no, scroll_slno} = await this.createNewScroll(type);

    const data:any = {
      subsystem: formData.subsystem,
      account: formData.account,
      mode: formData.mode || txnMode.Cash,
      amount: formData.amount,

      bank: formData.bank || 0,
      description: formData.description,
      narration: formData.narration,
      
      scroll_type: scroll_type,
      scroll_no:scroll_no!,
      scroll_slno: scroll_slno!,

      user: 1,
      status: 1,
      center_code: 'MAIN',
    }
    
    await remult.repo(TransactionMaster).insert(data);

    return {scroll_type, scroll_no, scroll_slno}
  }

  // Get New Scroll
  async createNewScroll(type:string){
    
    const current_year:number = new Date().getFullYear();

    const lastTransaction = (
      await this.transactionMasterRepo.find({
        where: {
          scroll_type: type,
          scroll_no: current_year
        },
        orderBy: {
          id: 'desc' // or createdAt: 'desc' if you have a timestamp field
        },
        limit: 1
      })
    )?.at(0);

    console.log("last",lastTransaction);
    
    const next_scroll_slno = lastTransaction ? lastTransaction!.scroll_slno + 1 : 1;

    return {
      scroll_type: type,
      scroll_no: current_year,
      scroll_slno: next_scroll_slno
    }
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

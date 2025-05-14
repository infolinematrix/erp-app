import { Injectable } from '@angular/core';
import { remult, repo } from 'remult';
import { GeneralAccount } from 'src/shared/GeneralAccount.entity';
import { GeneralLedger } from 'src/shared/GeneralLedger.entity';
import { TransactionMaster } from 'src/shared/TransactionMaster.entity';
import { BalancesheetGroup } from 'src/shared/BalanceseetCode.entity';
import { scrollType, txnMode } from 'src/app/core/constants/enums';
import { ClosingBalance } from 'src/shared/index';
import { ClearBalanceDto, UpdateClosingBalanceDto } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor() {}

  generalLedgerRepo = remult.repo(GeneralLedger);
  generalAccountRepo = remult.repo(GeneralAccount);
  bgGroupRepo = remult.repo(BalancesheetGroup);
  transactionMasterRepo = remult.repo(TransactionMaster);
  closingBalanceRepo = remult.repo(ClosingBalance);

  async getLedgers() {
    const data = await this.generalLedgerRepo.find();
    return data;
  }
  async findBySubsystem(subsystem: string) {
    const data = await this.generalLedgerRepo.findFirst({
      subsystem: subsystem.trim(),
    });
    return data;
  }
  async findLedger(id: any) {
    const data = await this.generalLedgerRepo.findFirst({
      id: id,
    });
    return data;
  }

  /**
   * Get account clear/Closing Balance
   * @param account
   */
  async getClearBalance(clearBalanceDto: ClearBalanceDto) {
    const queryDate = new Date(
      clearBalanceDto.date.getFullYear(),
      clearBalanceDto.date.getMonth(),
      clearBalanceDto.date.getDate()
    );
    
    /**
     * Date <= input date, disc order, First record
     */
    const closingBalanceEntry = await this.closingBalanceRepo.findFirst({
      subsystem: clearBalanceDto.subsystem.toString(),
      account: Number(clearBalanceDto.accountId),
      date: { $lte: queryDate },
    });

    if (closingBalanceEntry) {
      return closingBalanceEntry.balance;
    }

    if (clearBalanceDto.accountId !== 0) {
      const generalAccount = await this.generalAccountRepo.findFirst({
        subsystem: clearBalanceDto.subsystem,
        id: clearBalanceDto.accountId.toString(),
      });

      if (generalAccount) {
        return generalAccount.opening_balance || 0;
      }
    } else {
      const generalLedger = await this.generalLedgerRepo.findFirst({
        subsystem: clearBalanceDto.subsystem,
      });
      if (generalLedger && generalLedger.opening_balance) {
        return generalLedger.opening_balance || 0;
      }
    }

    return 0;
  }

  /**
   * Update Closing Balance
   * @param subsystem
   * @param account
   * @param date
   * @param amount
   */
  async updateClosingBalance(data: UpdateClosingBalanceDto) {
    const queryDate = new Date(
      data.date.getFullYear(),
      data.date.getMonth(),
      data.date.getDate()
    );

    try {
      const closingBalanceEntry = await this.closingBalanceRepo.findFirst({
        subsystem: data.subsystem,
        account: data.accountId,
        date: queryDate,
      });
      
      if (closingBalanceEntry) {
        closingBalanceEntry.balance = Number(closingBalanceEntry.balance) + Number(data.amount);
        
        await this.closingBalanceRepo.update(
        { 
          subsystem: data.subsystem.toString(),
          account: Number(data.accountId),
          date: queryDate,
        },closingBalanceEntry);

      return;
      } else {
        const newClosingBalance = new ClosingBalance();
      newClosingBalance.subsystem = data.subsystem;
      newClosingBalance.account = data.accountId;
      newClosingBalance.date = queryDate;
      newClosingBalance.balance = data.amount;
      await this.closingBalanceRepo.insert(newClosingBalance);
      return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAccounts() {
    const data = await this.generalAccountRepo.find({
      orderBy: { id: 'desc' },
    });
    return data;
  }
  async findAccount(id: number): Promise<GeneralAccount> {
    const data = await this.generalAccountRepo.findId(id.toString());
    return data!;
  }
  async findAccountsBySubsystem(subsystem: string) {
    const data = await this.generalAccountRepo.find({
      where: {
        subsystem: subsystem,
      },
    });

    return data!;
  }

  /**
   * Get Bank Accounts (subsystem : 'BANK')
   * @returns
   */
  async getBanks() {
    const data = await this.generalAccountRepo.find({
      where: {
        subsystem: 'BANK',
      },
      orderBy: { subsystem: 'asc' },
    });
    console.log('------------', data);

    return data;
  }

  /**
   * Receive Transaction
   * @param formData
   * @returns
   */
  async createTransactionReceive(formData: any) {
    console.log('Txn Data ', formData.ledger);
    const type =
      formData.mode?.toString().trim() === txnMode.Cash
        ? scrollType.HC
        : scrollType.KC;
    const { scroll_type, scroll_no, scroll_slno } = await this.createNewScroll(
      type
    );

   
    const data: any = {
      subsystem: formData.ledger.subsystem,
      account: formData.account.id,
      mode: formData.mode || txnMode.Cash,
      amount: formData.amount,

      bank: formData.bank || 0,
      description: formData.description,
      narration: formData.narration,

      scroll_type: scroll_type,
      scroll_no: scroll_no!,
      scroll_slno: scroll_slno!,
      user: 1,
      status: 1,
      center_code: 'MAIN',
    };

    console.log("-----------",data);
    

    // await remult.repo(TransactionMaster).insert(data);


    this.updateClosingBalance({
      subsystem: formData.ledger.subsystem,
      accountId: formData.account.id,
      date: new Date(),
      amount: formData.amount,
    });

    return { scroll_type, scroll_no, scroll_slno };
  }

  /**
   * Payement Transaction
   * @param formData
   * @returns
   */
  async createTransactionPayment(formData: any) {
    console.log('Txn Data ', formData.ledger);
    const type =
      formData.mode?.toString().trim() === txnMode.Cash
        ? scrollType.HC
        : scrollType.KC;

    const { scroll_type, scroll_no, scroll_slno } = await this.createNewScroll(
      type
    );

    const data: any = {
      subsystem: formData.ledger.subsystem,
      account: formData.account.id,
      mode: formData.mode || txnMode.Cash,
      amount: formData.amount,

      bank: formData.bank || 0,
      description: formData.description,
      narration: formData.narration,

      scroll_type: scroll_type,
      scroll_no: scroll_no!,
      scroll_slno: scroll_slno!,

      user: 1,
      status: 1,
      center_code: 'MAIN',
    };

    await remult.repo(TransactionMaster).insert(data);
    this.updateClosingBalance({
      subsystem: formData.ledger.subsystem,
      accountId: formData.account.id,
      date: new Date(),
      amount: formData.amount,
    });

    return { scroll_type, scroll_no, scroll_slno };
  }

  /**
   * Transactions
   * @param from_date
   * @param to_date
   * @param type
   */
  async getTransactions(
    from_date: Date,
    to_date: Date,
    mode: string,
    status: 0,
    limit: number = 25,
    page: number = 1
  ) {
    const inclusiveToDate = new Date(to_date);
    inclusiveToDate.setHours(23, 59, 59, 999);

    const whereClause: any = {
      created_at: { $gte: from_date, $lte: inclusiveToDate },
    };

    if (mode && mode.trim() !== '') {
      whereClause.mode = mode;
    }
    if (status && status !== 0) {
      whereClause.status = status;
    }

    const items = await this.transactionMasterRepo.find({
      where: whereClause,
      limit: limit,
      page: page,
      orderBy: { id: 'desc' },
      include: {
        accountDetails: true, 
      },
    });

    // Process items to determine the correct account name to display
    const processedItems = await Promise.all(
      items.map(async (item) => {
        let nameToDisplay = '';

        if (item.account !== 0 && item.accountDetails?.name) {
          nameToDisplay = item.accountDetails.name;
        } else if (item.account === 0) {
          const ledgerEntry = await this.generalLedgerRepo.findFirst({
            subsystem: item.subsystem,
          });
          nameToDisplay = ledgerEntry?.name || `Error`;
        }
        return { ...item, displayAccountName: nameToDisplay };
      })
    );

    // Fetch the total count of records matching the criteria
    const totalRecords = await this.transactionMasterRepo.count(whereClause);
    console.log(processedItems);
    
    return { data: processedItems, totalRecords: totalRecords };
  }

  // Get New Scroll
  async createNewScroll(type: string) {
    const current_year: number = new Date().getFullYear();

    const lastTransaction = (
      await this.transactionMasterRepo.find({
        where: {
          scroll_type: type,
          scroll_no: current_year,
        },
        orderBy: {
          id: 'desc', // or createdAt: 'desc' if you have a timestamp field
        },
        limit: 1,
      })
    )?.at(0);

    console.log('last', lastTransaction);

    const next_scroll_slno = lastTransaction
      ? lastTransaction!.scroll_slno + 1
      : 1;

    return {
      scroll_type: type,
      scroll_no: current_year,
      scroll_slno: next_scroll_slno,
    };
  }

  /**
   * Get all Balance Sheet Group/Code
   * @returns
   */
  async getBsGroups() {
    const data = await this.bgGroupRepo.find();
    return data;
  }

  async updateLedger(
    ledgerId: string,
    updatedLedgerData: any
  ): Promise<GeneralLedger> {
    await this.generalLedgerRepo.update(ledgerId.toString(), updatedLedgerData);
    return updatedLedgerData;
  }

  // updateAccount
  async updateAccount(
    accountId: string,
    updatedAccountData: any
  ): Promise<GeneralLedger> {
    await this.generalAccountRepo.update(
      accountId.toString(),
      updatedAccountData
    );
    return updatedAccountData;
  }

  async getStatement(
    subsystem:string,
    account: number = 0,
    from_date: Date,
    to_date: Date,
    mode: string,
    status: 0,
    limit: number = 25,
    page: number = 1
  ){
    const inclusiveToDate = new Date(to_date);
    inclusiveToDate.setHours(23, 59, 59, 999);

    const whereClause: any = {
      created_at: { $gte: from_date, $lte: inclusiveToDate },
    };

    if (mode && mode.trim() !== '') {
      whereClause.mode = mode;
    }
    if (status && status !== 0) {
      whereClause.status = status;
    }
    if (account && account !== 0) {
      whereClause.account = account;
    }
    if (subsystem && subsystem !== '') {
      whereClause.subsystem = subsystem;
    }

    const items = await this.transactionMasterRepo.find({
      where: whereClause,
      limit: limit,
      page: page,
      orderBy: { id: 'desc' },
      include: {
        accountDetails: true, 
      },
    });
    // Process items to determine the correct account name to display
    const processedItems = await Promise.all(
      items.map(async (item) => {
        let nameToDisplay = '';

        if (item.account !== 0 && item.accountDetails?.name) {
          nameToDisplay = item.accountDetails.name;
        } else if (item.account === 0) {
          const ledgerEntry = await this.generalLedgerRepo.findFirst({
            subsystem: item.subsystem,
          });
          nameToDisplay = ledgerEntry?.name || `Error`;
        }
        return { ...item, displayAccountName: nameToDisplay };
      })
    );
    // Fetch the total count of records matching the criteria
    const totalRecords = await this.transactionMasterRepo.count(whereClause);
    console.log(processedItems);
    
    return { data: processedItems, totalRecords: totalRecords };
  }
}

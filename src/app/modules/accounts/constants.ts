
export interface ClearBalanceDto{
    subsystem: string,
    accountId: number,
    date: Date;
}

export interface UpdateClosingBalanceDto {
    subsystem: string;
    accountId: number;
    date: Date;
    amount: number; 
  }

  export enum txnMode {
    Cash = 'VC',
    FundTransfer = 'FT',
    Cheque = 'CH',
    BankDraft = 'DD',
}
export enum voucherStatus {
    Pending = 1,
    Approved = 51,
    Cancelled = 98,
}

export enum scrollType {
    HD = 'HD',
    HC = 'HC',
    KD = 'KD',
    KC = 'KC',
    TD = 'TD',
    TC = 'TC',
}


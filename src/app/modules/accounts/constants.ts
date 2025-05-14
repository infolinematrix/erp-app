
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


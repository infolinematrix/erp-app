import { Entity, Fields } from 'remult';

@Entity('acct_closing_balance', {
  allowApiCrud: true,
  allowApiUpdate:true,
})
export class ClosingBalance {
  @Fields.autoIncrement()
  id!: number;

  @Fields.dateOnly()
  date!: Date;

  @Fields.string()
  subsystem = '';

  @Fields.number()
  account = 0;

  @Fields.number()
  balance = 0; 

}
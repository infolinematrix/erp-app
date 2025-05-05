import { Entity, Fields } from 'remult';

@Entity('acct_general_ledger', {
  allowApiCrud: true,
})
export class GeneralLedger {
  @Fields.autoIncrement()
  id!: string;

  @Fields.string()
  subsystem = '';

  @Fields.string()
  name = '';

  @Fields.string()
  allow_account = 'No'; 

   @Fields.number()
  bs_group = 0; 
  
  @Fields.string()
  is_active = 'No';

  @Fields.string()
  description = '';
}
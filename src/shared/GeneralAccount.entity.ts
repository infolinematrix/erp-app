import { Entity, Fields } from 'remult';

@Entity('acct_general_accounts', {
  allowApiCrud: true,
})
export class GeneralAccount {
  @Fields.autoIncrement()
  id!: string;

  @Fields.string()
  subsystem = '';

  @Fields.string()
  name = '';

  @Fields.string()
  description = '';

  @Fields.string()
  is_active = 'No';
  
  @Fields.string()
  allow_transfer= 'Yes';

  @Fields.string()
  allow_payment= 'No';

  @Fields.string()
  allow_receive= 'Yes';

  @Fields.number()
  opening_balance = 0;

  @Fields.number()
  bs_group = 0;
  
  @Fields.date() 
  created_on = new Date();
    
}
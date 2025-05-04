import { Entity, Fields } from 'remult';

@Entity('acct_general_accounts', {
  allowApiCrud: true,
})
export class GeneralAccount {
  @Fields.uuid()
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
  created_on = new Date();
    
}
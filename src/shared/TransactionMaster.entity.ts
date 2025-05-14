import { Entity, Fields, Relations } from 'remult';
import { scrollType, txnMode } from 'src/app/core/constants/enums';
import { GeneralAccount } from './GeneralAccount.entity';

@Entity('acct_transactions', {
  allowApiCrud: true,
  allowApiInsert:true,
  allowApiUpdate:true,
})
export class TransactionMaster {
    @Fields.autoIncrement()
    id!: string;
  
    @Fields.string()
    center_code = '';
    
    @Fields.string()
    scroll_type = '';

    @Fields.number()
    scroll_no = 0;

    @Fields.number()
    scroll_slno = 0;

    @Fields.number()
    amount=0.00;

    @Fields.number()
    status = 1;

    @Fields.number()
    user = 0;

    @Fields.createdAt()
    created_at = new Date();

    @Fields.date()
    updated_at = new Date();

    @Fields.number()
    updated_by = 0;

    @Fields.string()
    subsystem = '';

    @Fields.number()
    account = 0;

    @Relations.toOne(() => GeneralAccount, { field: 'account' })
    accountDetails?: GeneralAccount;

    @Fields.string()
    mode = '';

    @Fields.number()
    bank = 0;

    @Fields.string()
    description = '';

    @Fields.string()
    narration = null;

    @Fields.integer()
    authorised_by = 0;

    @Fields.date()
    authorised_at =null;

  }


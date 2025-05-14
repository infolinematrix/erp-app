
import { Entity, Fields } from 'remult';

@Entity('acct_balancesheet_group', {
  allowApiCrud: true,
})
export class BalancesheetGroup {
  @Fields.autoIncrement()
  id!: string;

  @Fields.string()
  group_name = '';

  @Fields.string()
  group_type = '';
}
import { Entity, Fields } from 'remult';

@Entity('hrms_holiday_master', {
  allowApiCrud: true,
})
export class HolidayMaster {
  @Fields.autoIncrement()
  id!: number;

   @Fields.string()
  title = '';

  @Fields.dateOnly()
  startDate!: Date;

  @Fields.dateOnly()
  endDate!: Date;

  @Fields.string()
  holidayType!: 'Full Day' | 'Half Day';
}

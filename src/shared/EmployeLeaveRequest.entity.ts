import { Entity, Fields, Relations } from 'remult';
import { Employee } from './Employee.entity';
import { User } from './User.entity';
import { LeaveType } from '../app/modules/human-resource/libs/constants';

@Entity('employee_leave_requests', {
  allowApiCrud: true,
})
export class EmployeeLeaveRequests {
  @Fields.autoIncrement()
  id!: number;

  @Relations.toOne(() => Employee)
  employee!: Employee;

  @Fields.date()
  startDate!: Date;

  @Fields.date()
  endDate!: Date;

  @Fields.string()
  reason!: string;

  @Fields.string()
  leave_type!: LeaveType;

  @Fields.string()
  status!: 'Pending' | 'Approved' | 'Rejected';

  @Relations.toOne(() => User)
  approval_user!: User;

  @Fields.date()
  approval_date!: Date;

  @Fields.createdAt()
  created_at!: Date;

  @Fields.updatedAt()
  updated_at!: Date;
}

import { Entity, Fields, Relations } from 'remult';
import { Employee } from './Employee.entity';

@Entity('employee_attendance', {
  allowApiCrud: true,
})
export class EmployeeAttendance {
  @Fields.autoIncrement()
  id!: number;

  @Fields.dateOnly() // Use dateOnly for SQL DATE type
  date!: Date;

  @Relations.toOne(() => Employee)
  employee?: Employee;

  @Fields.date({ allowNull: true }) // Represent TIME as string (e.g., "HH:MM:SS")
  inTime?: string;

  @Fields.date({ allowNull: true }) // Represent TIME as string
  outTime?: string;

  @Fields.string({ maxLength: 200 }) // It's good practice to specify maxLength if known
  remark = '';

  @Fields.string({ allowNull: true, maxLength: 10 })
  status?: string;

  @Fields.boolean() // Assuming 0 or 1 for false/true, or other integer codes
  is_editable!: false;

  @Fields.createdAt()
  created_at = new Date();

  @Fields.updatedAt({ allowNull: true })
  updated_at!: null;
}

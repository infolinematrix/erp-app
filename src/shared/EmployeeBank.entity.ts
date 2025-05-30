import { Entity, Fields, Relations, Validators } from 'remult';
import { Employee } from './Employee.entity'; // Assuming Employee entity exists

@Entity('employee_banks', { allowApiCrud: true })
export class EmployeeBank {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({ validate: Validators.required })
  bank_name = '';

  @Fields.string({ validate: Validators.required })
  branch_name = '';

  @Fields.string({ validate: Validators.required })
  account_no = '';

  @Fields.string({ validate: Validators.required })
  ifsc_code = '';

  @Fields.string({ validate: Validators.required })
  account_type = ''; // e.g., Savings, Current

  // Relation to Employee
  // This setup implies that an 'employeeId' column will be managed by Remult.
  // Queries will use this relation.
  @Relations.toOne(() => Employee)
  employee?: Employee;
}